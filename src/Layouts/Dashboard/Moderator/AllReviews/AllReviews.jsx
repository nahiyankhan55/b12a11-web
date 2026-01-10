import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import WebContext from "../../../../Context/WebContext";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import DataLoader from "../../../../Components/DataLoader";
import { HeadProvider, Title } from "react-head";
import {
  MdDelete,
  MdVisibility,
  MdStar,
  MdCalendarToday,
  MdClose,
  MdRateReview,
} from "react-icons/md";

const columnHelper = createColumnHelper();

const AllReviews = () => {
  const AxiosPublic = useAxiosPublic();
  const { user, theme } = useContext(WebContext);
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null);

  const { data: userData } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews", user?.email],
    enabled: !!userData?.moderatorFor,
    queryFn: async () => {
      const res = await AxiosPublic.get(
        `/reviews?modMail=${userData?.moderatorFor}`
      );
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete review?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete",
      background: theme === "dark" ? "#0f172a" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await AxiosPublic.delete(`/reviews/${id}`);
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              timer: 1000,
              showConfirmButton: false,
            });
            queryClient.invalidateQueries(["reviews", user?.email]);
          }
        } catch (err) {
          Swal.fire({ icon: "error", title: "Error deleting review" });
        }
      }
    });
  };

  const columns = [
    columnHelper.accessor((_, i) => i + 1, {
      id: "index",
      header: "#",
      cell: (info) => (
        <span className="font-bold opacity-50">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("scholarshipName", {
      header: "Scholarship & University",
      cell: (info) => (
        <div className="flex flex-col max-w-[200px]">
          <span className="font-bold text-sm truncate" title={info.getValue()}>
            {info.getValue()}
          </span>
          <span className="text-[10px] uppercase tracking-wider opacity-60 font-black">
            {info.row.original.universityName}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor("reviewComment", {
      header: "User Feedback",
      cell: (info) => (
        <p className="text-xs italic opacity-80 line-clamp-1 max-w-[250px]">
          "{info.getValue()}"
        </p>
      ),
    }),
    columnHelper.accessor("ratingPoint", {
      header: "Rating",
      cell: (info) => (
        <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 px-2 py-1 rounded-lg w-fit font-black text-xs">
          <MdStar className="text-amber-500" /> {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor("reviewDate", {
      header: "Posted On",
      cell: (info) => (
        <div className="flex items-center gap-1 opacity-70 text-xs">
          <MdCalendarToday size={12} />
          {new Date(info.getValue()).toLocaleDateString()}
        </div>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="flex gap-2">
          <button
            onClick={() => setSelected(info.row.original)}
            className="p-2 bg-sky-500/10 text-sky-500 rounded-xl hover:bg-sky-500 hover:text-white transition-all"
            title="View Details"
          >
            <MdVisibility size={18} />
          </button>
          <button
            onClick={() => handleDelete(info.row.original._id)}
            className="p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
            title="Delete Review"
          >
            <MdDelete size={18} />
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: reviews,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) return <DataLoader />;
  if (isError)
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Failed to load reviews.
      </div>
    );

  return (
    <div className="w-full p-2 sm:p-4 md:p-8">
      <HeadProvider>
        <Title>Manage Reviews || ScholarStream</Title>
      </HeadProvider>

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2
            className={`md:text-3xl text-2xl font-black tracking-tight ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Manage Reviews
          </h2>
          <p className="opacity-60 font-medium">
            Reviewing feedback for scholarships under your moderation.
          </p>
        </div>
        <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-2xl shadow-lg">
          <MdRateReview />
        </div>
      </div>

      {/* Table Section */}
      <div
        className={`overflow-hidden rounded-4xl border transition-all ${
          theme === "dark"
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-gray-100 shadow-xl shadow-gray-200/50"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead
              className={`text-[10px] uppercase tracking-[0.2em] font-black border-b ${
                theme === "dark"
                  ? "bg-slate-800/50 border-slate-800 text-slate-500"
                  : "bg-gray-50 border-gray-100 text-slate-400"
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
                  className="hover:bg-sky-500/5 transition-colors"
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

        {/* Pagination */}
        <div className="p-6 flex items-center justify-between border-t border-slate-500/10">
          <span className="text-xs font-bold opacity-50 uppercase tracking-widest">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-4 py-2 rounded-xl bg-slate-500/10 text-xs font-black uppercase disabled:opacity-20 hover:bg-sky-500 hover:text-white transition-all"
            >
              Prev
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-black uppercase disabled:opacity-20 hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modern Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            className={`w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden ${
              theme === "dark"
                ? "bg-slate-900 border border-slate-800"
                : "bg-white"
            }`}
          >
            <div className="p-8 relative">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors"
              >
                <MdClose size={24} />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <img
                  src={selected.userImage}
                  alt=""
                  className="w-16 h-16 rounded-2xl object-cover shadow-lg"
                />
                <div>
                  <h3 className="font-black sm:text-xl text-lg tracking-tight leading-none">
                    {selected.userName}
                  </h3>
                  <p className="text-sm opacity-60 font-medium">
                    {selected.userEmail}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-sky-500 block mb-1">
                    Scholarship
                  </span>
                  <p className="font-bold text-lg leading-tight">
                    {selected.scholarshipName}
                  </p>
                  <p className="text-xs opacity-60 font-bold uppercase mt-1">
                    {selected.universityName}
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-slate-500/5 border border-slate-500/10 italic text-sm leading-relaxed opacity-80">
                  "{selected.reviewComment}"
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-1 bg-amber-500/10 text-amber-500 px-4 py-2 rounded-2xl font-black">
                    <MdStar /> {selected.ratingPoint}
                  </div>
                  <div className="text-xs font-bold opacity-40 uppercase tracking-tighter">
                    Posted: {new Date(selected.reviewDate).toDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllReviews;
