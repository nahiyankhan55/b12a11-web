import { useState, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import Swal from "sweetalert2";
import DataLoader from "../../../../Components/DataLoader";
import WebContext from "../../../../Context/WebContext";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import { HeadProvider, Title } from "react-head";
import {
  MdDescription,
  MdFeedback,
  MdCached,
  MdCheckCircle,
  MdDeleteForever,
  MdClose,
  MdSchool,
  MdPerson,
  MdAttachMoney,
} from "react-icons/md";

const columnHelper = createColumnHelper();

const ManageAppliedApplications = () => {
  const AxiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const { user, theme } = useContext(WebContext);
  const [selected, setSelected] = useState(null);
  const [feedbackOpenFor, setFeedbackOpenFor] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  const { data: userData } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const {
    data: applications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["applications", "all", userData?.moderatorFor],
    queryFn: async () => {
      const res = await AxiosPublic.get(
        `/applications/${userData?.moderatorFor}`
      );
      return res.data;
    },
    enabled: !!userData?.moderatorFor,
  });

  const handleSendFeedback = async () => {
    if (!feedbackText.trim()) return;
    try {
      const res = await AxiosPublic.put(
        `/applications/${feedbackOpenFor._id}/feedback`,
        {
          feedback: feedbackText,
        }
      );
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Feedback saved",
          timer: 1000,
          showConfirmButton: false,
        });
        setFeedbackOpenFor(null);
        queryClient.invalidateQueries(["applications", "all"]);
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error saving feedback" });
    }
  };

  const changeStatus = (app, newStatus) => {
    Swal.fire({
      title: `Move to ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      background: theme === "dark" ? "#0f172a" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await AxiosPublic.put(`/applications/${app._id}/status`, {
            status: newStatus,
          });
          Swal.fire({
            icon: "success",
            title: "Status Updated",
            timer: 1000,
            showConfirmButton: false,
          });
          queryClient.invalidateQueries(["applications", "all"]);
        } catch (err) {
          Swal.fire({ icon: "error", title: "Update Failed" });
        }
      }
    });
  };

  const handleReject = (app) => {
    Swal.fire({
      title: "Reject Application?",
      text: "This will remove the application from records.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Reject",
      background: theme === "dark" ? "#0f172a" : "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await AxiosPublic.delete(`/applications/delete/${app._id}`);
          Swal.fire({
            icon: "success",
            title: "Rejected Successfully",
            timer: 1000,
            showConfirmButton: false,
          });
          queryClient.invalidateQueries(["applications", "all"]);
        } catch (err) {
          Swal.fire({ icon: "error", title: "Rejection Failed" });
        }
      }
    });
  };

  const columns = [
    columnHelper.accessor("applicant", {
      header: "Applicant",
      cell: (info) => (
        <div className="flex flex-col">
          <span className="font-bold text-sm tracking-tight">
            {info.getValue()}
          </span>
          <span className="text-[10px] opacity-50 font-black truncate max-w-[120px]">
            {info.row.original.userEmail}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor("universityName", {
      header: "University & Scholarship",
      cell: (info) => (
        <div className="flex flex-col">
          <span className="font-black text-[10px] uppercase text-sky-500 tracking-wider leading-none mb-1">
            {info.getValue()}
          </span>
          <span
            className="text-xs font-bold line-clamp-1 opacity-80"
            title={info.row.original.scholarshipName}
          >
            {info.row.original.scholarshipName}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor("fees", {
      header: "Fees",
      cell: (info) => (
        <span className="font-black text-xs">৳{info.getValue() || "0"}</span>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue() || "pending";
        const styles = {
          completed: "bg-emerald-500/10 text-emerald-500",
          processing: "bg-amber-500/10 text-amber-500",
          pending: "bg-slate-500/10 text-slate-500",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${styles[status]}`}
          >
            {status}
          </span>
        );
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Management Actions",
      cell: (info) => {
        const app = info.row.original;
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelected(app)}
              className="p-2 bg-slate-500/10 hover:bg-slate-500 hover:text-white rounded-xl transition-all"
              title="Details"
            >
              <MdDescription size={18} />
            </button>
            <button
              onClick={() => {
                setFeedbackOpenFor(app);
                setFeedbackText(app.feedback || "");
              }}
              className="p-2 bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white rounded-xl transition-all"
              title="Feedback"
            >
              <MdFeedback size={18} />
            </button>
            <button
              onClick={() => changeStatus(app, "processing")}
              className="p-2 bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white rounded-xl transition-all"
              title="Process"
            >
              <MdCached size={18} />
            </button>
            <button
              onClick={() => changeStatus(app, "completed")}
              className="p-2 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-xl transition-all"
              title="Complete"
            >
              <MdCheckCircle size={18} />
            </button>
            <button
              onClick={() => handleReject(app)}
              className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
              title="Reject"
            >
              <MdDeleteForever size={18} />
            </button>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: applications,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <DataLoader />;

  return (
    <div className="w-full p-2 sm:p-4 md:p-8">
      <HeadProvider>
        <Title>Manage Applications || ScholarStream</Title>
      </HeadProvider>

      <div className="mb-8">
        <h2
          className={`md:text-3xl text-2xl font-black tracking-tight ${
            theme === "dark" ? "text-white" : "text-slate-900"
          }`}
        >
          Application Management
        </h2>
        <p className="opacity-60 font-medium italic text-sm uppercase tracking-widest">
          Moderator Control Panel
        </p>
      </div>

      {/* Modern Table Card */}
      <div
        className={`overflow-hidden rounded-4xl border transition-all ${
          theme === "dark"
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-gray-100 shadow-xl shadow-gray-200/50"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
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
                  className="hover:bg-sky-500/5 transition-colors group"
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

        {/* Improved Pagination */}
        <div className="p-6 flex items-center justify-between border-t border-slate-500/10">
          <p className="text-[10px] font-black uppercase opacity-40">
            Showing 10 per page
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-5 py-2 rounded-2xl bg-slate-500/10 text-xs font-black uppercase disabled:opacity-20 hover:bg-sky-500 hover:text-white transition-all"
            >
              Prev
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-5 py-2 rounded-2xl bg-sky-500 text-white text-xs font-black uppercase disabled:opacity-20 hover:bg-sky-600 transition-all shadow-lg shadow-sky-500/20"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selected && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            className={`w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden ${
              theme === "dark"
                ? "bg-slate-900 border border-slate-800"
                : "bg-white"
            }`}
          >
            <div className="p-10 relative">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-8 right-8 p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors"
              >
                <MdClose size={28} />
              </button>

              <div className="flex items-center gap-3 text-sky-500 font-black text-xs uppercase tracking-widest mb-4">
                <MdSchool size={18} /> Full Application Dossier
              </div>

              <h3 className="text-3xl font-black mb-1 leading-tight">
                {selected.scholarshipName}
              </h3>
              <p className="opacity-60 font-bold uppercase text-xs mb-8">
                {selected.universityName}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <DetailItem
                    icon={<MdPerson />}
                    label="Applicant"
                    value={selected.userName}
                    subValue={selected.applicant}
                  />
                  <DetailItem
                    icon={<MdAttachMoney />}
                    label="Payment Status"
                    value={selected.payment || "Unpaid"}
                  />
                </div>
                <div className="space-y-6">
                  <DetailItem
                    icon={<MdCached />}
                    label="Current Status"
                    value={selected.status || "Pending"}
                  />
                  <div className="p-4 rounded-3xl bg-slate-500/5 border border-slate-500/10">
                    <span className="text-[10px] font-black uppercase opacity-40 block mb-2">
                      Feedback Provided
                    </span>
                    <p className="text-sm italic opacity-80 leading-relaxed">
                      {selected.feedback || "No feedback shared yet."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackOpenFor && (
        <div className="fixed inset-0 z-110 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in zoom-in duration-300">
          <div
            className={`w-full max-w-md rounded-[2.5rem] p-8 ${
              theme === "dark" ? "bg-slate-900" : "bg-white shadow-2xl"
            }`}
          >
            <h4 className="text-xl font-black mb-2 flex items-center gap-2">
              <MdFeedback className="text-sky-500" /> Submit Feedback
            </h4>
            <p className="text-xs opacity-50 mb-6 font-bold uppercase">
              {feedbackOpenFor.scholarshipName}
            </p>

            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Enter feedback for the applicant..."
              className={`w-full h-40 p-5 rounded-3xl border outline-none transition-all ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 text-white focus:border-sky-500"
                  : "bg-gray-50 border-gray-100 focus:bg-white focus:border-sky-500"
              }`}
            />

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setFeedbackOpenFor(null)}
                className="flex-1 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest opacity-50 hover:opacity-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSendFeedback}
                className="flex-1 py-3 rounded-2xl bg-sky-500 text-white font-black uppercase text-[10px] tracking-widest shadow-lg shadow-sky-500/20"
              >
                Save Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-component for Details
const DetailItem = ({ icon, label, value, subValue }) => (
  <div className="flex gap-4 items-start">
    <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-500">{icon}</div>
    <div>
      <span className="text-[10px] font-black uppercase opacity-40 block mb-1">
        {label}
      </span>
      <p className="font-bold text-sm leading-none">{value}</p>
      {subValue && (
        <p className="text-[10px] opacity-60 font-medium mt-1">{subValue}</p>
      )}
    </div>
  </div>
);

export default ManageAppliedApplications;
