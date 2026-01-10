import { useState, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import WebContext from "../../../../Context/WebContext";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import ReviewAddEdit from "../ReviewAddEdit/ReviewAddEdit";
import DataLoader from "../../../../Components/DataLoader";
import { HeadProvider, Title } from "react-head";
import {
  MdEdit,
  MdDelete,
  MdStar,
  MdSchool,
  MdEvent,
  MdChatBubbleOutline,
} from "react-icons/md";

const MyReviews = () => {
  const { user, theme } = useContext(WebContext);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [editing, setEditing] = useState(null);

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews", {
        params: { email: user?.email },
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete Review?",
      text: "This cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      background: theme === "dark" ? "#0f172a" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/reviews/${id}`);
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            showConfirmButton: false,
            timer: 1000,
          });
          queryClient.invalidateQueries(["myReviews", user.email]);
        }
      }
    });
  };

  if (isLoading) return <DataLoader />;

  return (
    <div className="w-full p-2 sm:p-4 md:p-8">
      <HeadProvider>
        <Title>My Reviews || ScholarStream</Title>
      </HeadProvider>

      <div className="mb-8">
        <h2
          className={`md:text-3xl text-2xl font-black tracking-tight ${
            theme === "dark" ? "text-white" : "text-slate-900"
          }`}
        >
          My Reviews
        </h2>
        <p className="opacity-60 font-medium italic text-sm uppercase tracking-widest">
          Feedback History
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="py-20 text-center opacity-40 italic">
          You haven't posted any reviews yet.
        </div>
      ) : (
        <div
          className={`overflow-hidden rounded-[2.5rem] border transition-all ${
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
                <tr>
                  <th className="p-6">Scholarship & University</th>
                  <th className="p-6">Review Comment</th>
                  <th className="p-6 text-center">Rating</th>
                  <th className="p-6">Date</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-500/10">
                {reviews.map((rev) => (
                  <tr
                    key={rev._id}
                    className="hover:bg-sky-500/5 transition-colors group"
                  >
                    {/* Scholarship & University */}
                    <td className="p-6 max-w-[250px]">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 p-2 rounded-xl bg-sky-500/10 text-sky-500">
                          <MdSchool size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-sm leading-tight mb-1">
                            {rev.scholarshipName}
                          </p>
                          <p className="text-[10px] uppercase font-black opacity-50 tracking-tighter">
                            {rev.universityName}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Comment */}
                    <td className="p-6">
                      <div className="flex items-start gap-2 opacity-80 italic text-sm max-w-xs">
                        <MdChatBubbleOutline className="mt-1 shrink-0 text-slate-400" />
                        <p className="line-clamp-2" title={rev.reviewComment}>
                          "{rev.reviewComment}"
                        </p>
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="p-6 text-center">
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 font-black text-xs">
                        <MdStar /> {rev.ratingPoint}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="p-6">
                      <div className="flex items-center gap-1 text-[10px] font-bold opacity-60">
                        <MdEvent />{" "}
                        {new Date(rev.reviewDate).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditing(rev)}
                          className="p-2 bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white rounded-xl transition-all shadow-sm"
                          title="Edit Review"
                        >
                          <MdEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(rev._id)}
                          className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm"
                          title="Delete Review"
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal (Portal style via component) */}
      {editing && (
        <div className="fixed inset-0 z-150 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div
            className={`w-full max-w-lg rounded-[2.5rem] p-2 ${
              theme === "dark" ? "bg-slate-800" : "bg-white"
            }`}
          >
            <ReviewAddEdit
              review={editing}
              onClose={() => {
                setEditing(null);
                queryClient.invalidateQueries(["myReviews", user.email]);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
