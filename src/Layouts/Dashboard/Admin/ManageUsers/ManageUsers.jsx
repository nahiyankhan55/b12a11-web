import { useState, useMemo, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import WebContext from "../../../../Context/WebContext";
import { HeadProvider, Title } from "react-head";
import DataLoader from "../../../../Components/DataLoader";
import {
  MdDelete,
  MdCheckCircle,
  MdPersonAddAlt1,
  MdFilterList,
} from "react-icons/md";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [roleFilter, setRoleFilter] = useState("");
  const { user, theme } = useContext(WebContext);

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
    retry: 0,
  });

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await axiosSecure.put(`/users/${userId}/role`, {
        role: newRole,
      });
      if (res.status === 200) {
        toast.success(`Role updated to ${newRole}`);
        refetch();
      }
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
      background: theme === "dark" ? "#0f172a" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/users/${userId}`);
          toast.success("User deleted");
          refetch();
        } catch (err) {
          toast.error("Delete failed");
        }
      }
    });
  };

  const handleAssign = async (userEmail) => {
    try {
      const res = await axiosSecure.put(`/users/assign/${userEmail}`, {
        moderatorFor: user.email,
      });
      if (res.status === 200) {
        toast.success("Moderator assigned successfully");
        refetch();
      }
    } catch (err) {
      toast.error("Assignment failed");
    }
  };

  const tableData = useMemo(() => {
    return roleFilter ? users.filter((u) => u.role === roleFilter) : users;
  }, [users, roleFilter]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "User Details",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-bold text-sm">{row.original.name}</span>
            <span className="text-xs opacity-50">{row.original.email}</span>
          </div>
        ),
      },
      {
        accessorKey: "role",
        header: "Role Management",
        cell: ({ row }) => (
          <select
            value={row.original.role}
            disabled={row.original.role === "Admin"}
            onChange={(e) => handleRoleChange(row.original._id, e.target.value)}
            className={`text-xs font-bold px-3 py-2 rounded-xl outline-none border transition-all ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700 text-slate-300"
                : "bg-gray-50 border-gray-200 text-slate-700"
            } ${
              row.original.role === "Admin"
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer focus:border-sky-500"
            }`}
          >
            <option value="Student">Student</option>
            <option value="Moderator">Moderator</option>
            <option value="Admin">Admin</option>
          </select>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {/* Delete Button */}
            <button
              disabled={row.original.role === "Admin"}
              onClick={() => handleDelete(row.original._id)}
              className={`p-2 rounded-xl transition-all ${
                row.original.role === "Admin"
                  ? "opacity-20 cursor-not-allowed"
                  : "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white"
              }`}
              title="Delete User"
            >
              <MdDelete size={18} />
            </button>

            {/* Assign Button (Only for Moderators) */}
            {row.original.role === "Moderator" && (
              <button
                disabled={row.original?.moderatorFor}
                onClick={() => handleAssign(row.original.email)}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-black transition-all ${
                  row.original?.moderatorFor
                    ? "bg-emerald-500/10 text-emerald-500 opacity-60"
                    : "bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/20"
                }`}
              >
                {row.original?.moderatorFor ? (
                  <>
                    <MdCheckCircle className="text-lg" /> Assigned
                  </>
                ) : (
                  <>
                    <MdPersonAddAlt1 className="text-lg" /> Assign
                  </>
                )}
              </button>
            )}
          </div>
        ),
      },
    ],
    [theme, user?.email]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <DataLoader />;

  return (
    <div className="w-full p-2 sm:p-4 md:p-8">
      <HeadProvider>
        <Title>Manage Users || ScholarStream</Title>
      </HeadProvider>

      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2
            className={`md:text-3xl text-2xl font-black tracking-tight ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Manage Platform Users
          </h2>
          <p className="opacity-60 font-medium text-sm lg:text-base">
            Control user roles, permissions and account status.
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-2xl border flex items-center gap-2 ${
              theme === "dark"
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-gray-100 shadow-sm"
            }`}
          >
            <MdFilterList className="text-sky-500" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-transparent text-xs font-black uppercase tracking-widest outline-none cursor-pointer"
            >
              <option value="">All Roles</option>
              <option value="Student">Students</option>
              <option value="Moderator">Moderators</option>
              <option value="Admin">Admins</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div
        className={`overflow-hidden rounded-4xl border transition-all duration-300 ${
          theme === "dark"
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-gray-100 shadow-xl shadow-gray-200/50"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead
              className={`text-[10px] uppercase tracking-[0.2em] font-black ${
                theme === "dark"
                  ? "bg-slate-800/50 text-slate-500"
                  : "bg-gray-50 text-slate-400"
              }`}
            >
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th key={header.id} className="p-6">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-slate-500/10">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`transition-colors ${
                    theme === "dark"
                      ? "hover:bg-slate-800/30"
                      : "hover:bg-gray-50/50"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-6">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {tableData.length === 0 && (
          <div className="p-20 text-center opacity-40 font-bold tracking-widest uppercase text-xs">
            No users found in this category
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
