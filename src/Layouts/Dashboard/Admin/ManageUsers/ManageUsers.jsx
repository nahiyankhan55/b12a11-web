import { useState, useMemo, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import WebContext from "../../../../Context/WebContext";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [roleFilter, setRoleFilter] = useState("");
  const { user } = useContext(WebContext);

  // Fetch all users
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
        toast.success("Role updated successfully");
        refetch(); // safer than invalidateQueries
      }
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await axiosSecure.delete(`/users/${userId}`);
      if (res.status === 200) {
        toast.success("User deleted successfully");
        refetch();
      }
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  // assign moderator
  const handleAssign = async (userEmail) => {
    try {
      const res = await axiosSecure.put(`/users/assign/${userEmail}`, {
        moderatorFor: user.email, // এখানে যেটা save হবে
      });

      if (res.status === 200) {
        toast.success("Moderator assigned successfully");
        refetch();
      }
    } catch (err) {
      toast.error("Failed to assign moderator");
    }
  };

  // Memoized filtered data
  const tableData = useMemo(() => {
    return roleFilter
      ? users.filter((user) => user.role === roleFilter)
      : users;
  }, [users, roleFilter]);

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
          <Select
            value={row.original.role}
            readOnly={row.original.role === "Admin"}
            onChange={(e) => handleRoleChange(row.original._id, e.target.value)}
            size="small"
          >
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Moderator">Moderator</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              color={row.original.role === "Admin" ? "inherit" : "error"}
              size="small"
              variant="contained"
              disabled={row.original.role === "Admin"}
              onClick={() => handleDelete(row.original._id)}
            >
              Delete
            </Button>

            {/* Only for Moderator role */}
            {row.original.role === "Moderator" && (
              <Button
                color={
                  user.email === row.original?.moderatorFor
                    ? "inherit"
                    : "primary"
                }
                size="small"
                variant="contained"
                disabled={user.email === row.original?.moderatorFor}
                onClick={() => handleAssign(row.original.email)}
              >
                {user.email === row.original?.moderatorFor
                  ? "Assigned"
                  : "Assign"}
              </Button>
            )}
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p className="text-center py-5">Loading...</p>;

  return (
    <div className="md:p-6 p-2 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>

      <div className="mb-4">
        <Select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">All Roles</MenuItem>
          <MenuItem value="Student">Student</MenuItem>
          <MenuItem value="Moderator">Moderator</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
        </Select>
      </div>

      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageUsers;
