import { useState, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import WebContext from "../../../../Context/WebContext";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import DataLoader from "../../../../Components/DataLoader";
import Swal from "sweetalert2";
import { HeadProvider, Title } from "react-head";
import {
  MdVisibility,
  MdEdit,
  MdDelete,
  MdPayment,
  MdRateReview,
  MdClose,
  MdSchool,
  MdLocationOn,
  MdStar,
} from "react-icons/md";

const MyApplications = () => {
  const { user, theme } = useContext(WebContext);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [selectedForReview, setSelectedForReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: applications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["applications", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get("/applications/user", {
        params: { email: user?.email },
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleEdit = (app) => {
    if (app.status !== "pending") {
      toast.info("Only pending applications can be edited.");
      return;
    }
    navigate(`/dashboard/edit-application/${app._id}`, { state: { app } });
  };

  const handlePay = (app) => {
    if (app.status !== "pending" || app.payment === "Paid") {
      toast.info("Payment not required or already completed.");
      return;
    }
    navigate("/payment", {
      state: { scholarship: app.scholar || { _id: app.scholarshipId } },
    });
  };

  const handleDelete = async (app) => {
    if (app.status !== "pending") {
      toast.info("Only pending applications can be deleted.");
      return;
    }

    const result = await Swal.fire({
      title: "Delete Application?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      background: theme === "dark" ? "#0f172a" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/applications/${app._id}`);
        toast.success("Application deleted");
        queryClient.invalidateQueries(["applications", user?.email]);
      } catch (err) {
        toast.error("Failed to delete");
      }
    }
  };

  const handleSubmitReview = async () => {
    if (!rating || !comment) {
      toast.error("Please provide rating & comment.");
      return;
    }

    try {
      const reviewData = {
        scholarshipId: selectedForReview.scholarshipId,
        universityName: selectedForReview.universityName,
        scholarshipName: selectedForReview.scholarshipName,
        userName: user.displayName,
        userEmail: user.email,
        postByEmail: selectedForReview.scholar.postedUserEmail,
        userImage: user.photoURL,
        ratingPoint: Number(rating),
        reviewComment: comment,
        reviewDate: new Date(),
      };

      await axiosSecure.post("/reviews", reviewData);
      toast.success("Thank you for your review!");
      queryClient.invalidateQueries(["applications", user.email]);
      setReviewOpen(false);
    } catch (error) {
      toast.error("Submission failed.");
    }
  };

  if (isLoading) return <DataLoader />;

  return (
    <div className="w-full p-2 sm:p-4 md:p-8">
      <HeadProvider>
        <Title>My Applications || ScholarStream</Title>
      </HeadProvider>

      <div className="mb-8">
        <h2
          className={`text-3xl font-black tracking-tight ${
            theme === "dark" ? "text-white" : "text-slate-900"
          }`}
        >
          My Applications
        </h2>
        <p className="opacity-60 font-medium">
          Track and manage your scholarship requests
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="py-20 text-center opacity-40 italic">
          No applications found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className={`group rounded-[2.5rem] overflow-hidden border transition-all hover:shadow-2xl ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-800 hover:shadow-sky-500/10"
                  : "bg-white border-gray-100 hover:shadow-gray-200"
              }`}
            >
              {/* Image Header */}
              <div className="h-44 relative overflow-hidden">
                <img
                  src={
                    app.scholar?.universityImage ||
                    "https://via.placeholder.com/400x200"
                  }
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt=""
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
                      app.status === "completed"
                        ? "bg-emerald-500 text-white"
                        : app.status === "processing"
                        ? "bg-amber-500 text-white"
                        : "bg-sky-500 text-white"
                    }`}
                  >
                    {app.status || "pending"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sky-500 text-[10px] font-black uppercase tracking-wider mb-2">
                  <MdSchool /> {app.scholar?.degree || "Degree"}
                </div>
                <h3 className="font-black text-lg leading-tight mb-1 line-clamp-1">
                  {app.scholarshipName}
                </h3>
                <div className="flex items-center gap-1 text-xs opacity-60 mb-4 font-bold uppercase tracking-tighter">
                  <MdLocationOn /> {app.universityName}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-slate-500/10 px-3 py-1 rounded-xl text-[10px] font-bold uppercase">
                    {app.scholar.scholarshipCategory}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-xl text-[10px] font-bold uppercase ${
                      app.payment === "Paid"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {app.payment || "Unpaid"}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 border-t border-slate-500/10 pt-4">
                  <button
                    onClick={() => setSelected(app)}
                    className="flex-1 p-3 bg-slate-500/10 rounded-2xl hover:bg-slate-500 hover:text-white transition-all flex justify-center shadow-sm"
                    title="Details"
                  >
                    <MdVisibility size={20} />
                  </button>

                  {app.status === "completed" ? (
                    <button
                      onClick={() => {
                        setSelectedForReview(app);
                        setReviewOpen(true);
                      }}
                      className="flex-2 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                    >
                      <MdRateReview /> Add Review
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(app)}
                        className="flex-1 p-3 bg-sky-500/10 text-sky-500 rounded-2xl hover:bg-sky-500 hover:text-white transition-all flex justify-center"
                        title="Edit"
                      >
                        <MdEdit size={20} />
                      </button>
                      <button
                        onClick={() => handlePay(app)}
                        disabled={app.payment === "Paid"}
                        className="flex-1 p-3 bg-amber-500/10 text-amber-500 rounded-2xl hover:bg-amber-500 hover:text-white disabled:opacity-20 transition-all flex justify-center"
                        title="Pay"
                      >
                        <MdPayment size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(app)}
                        className="flex-1 p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all flex justify-center"
                        title="Delete"
                      >
                        <MdDelete size={20} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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

              <h3 className="text-3xl font-black mb-1 leading-tight">
                {selected.scholarshipName}
              </h3>
              <p className="opacity-60 font-bold uppercase text-xs mb-8">
                {selected.universityName}
              </p>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <span className="text-[10px] font-black uppercase opacity-40 block mb-1">
                    Status
                  </span>
                  <p className="font-bold text-sm uppercase tracking-widest text-sky-500">
                    {selected.status || "Pending"}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase opacity-40 block mb-1">
                    Applied Date
                  </span>
                  <p className="font-bold text-sm">
                    {new Date(selected.appliedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-500/5 border border-slate-500/10">
                <span className="text-[10px] font-black uppercase opacity-40 block mb-2">
                  Moderator Feedback
                </span>
                <p className="text-sm italic opacity-80 leading-relaxed">
                  {selected.feedback || "No feedback from moderator yet."}
                </p>
              </div>

              <div className="mt-10 flex gap-4">
                <button
                  onClick={() => {
                    handleEdit(selected);
                    setSelected(null);
                  }}
                  className="flex-1 py-4 bg-sky-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-sky-500/20"
                >
                  Edit Application
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="flex-1 py-4 bg-slate-500/10 rounded-2xl font-black uppercase text-[10px] tracking-widest"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewOpen && (
        <div className="fixed inset-0 z-110 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in zoom-in duration-300">
          <div
            className={`w-full max-w-md rounded-[2.5rem] p-8 ${
              theme === "dark"
                ? "bg-slate-900 border border-slate-800"
                : "bg-white shadow-2xl"
            }`}
          >
            <h4 className="text-xl font-black mb-6 flex items-center gap-2">
              <MdRateReview className="text-sky-500" /> Share Your Experience
            </h4>

            <div className="mb-6">
              <span className="text-[10px] font-black uppercase opacity-40 block mb-2">
                Rating (1-5)
              </span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setRating(num)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      rating >= num
                        ? "bg-amber-500 text-white shadow-lg"
                        : "bg-slate-500/10"
                    }`}
                  >
                    <MdStar size={20} />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <span className="text-[10px] font-black uppercase opacity-40 block mb-2">
                Your Thoughts
              </span>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={`w-full h-32 p-4 rounded-2xl border outline-none transition-all ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700 text-white focus:border-sky-500"
                    : "bg-gray-50 border-gray-100 focus:bg-white focus:border-sky-500"
                }`}
                placeholder="Tell us about the process..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setReviewOpen(false)}
                className="flex-1 py-3 font-black uppercase text-[10px] opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="flex-1 py-3 bg-sky-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-sky-500/20"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
