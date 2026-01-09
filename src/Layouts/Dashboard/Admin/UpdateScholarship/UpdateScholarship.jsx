import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import DataLoader from "../../../../Components/DataLoader";
import { HeadProvider, Title } from "react-head";
import WebContext from "../../../../Context/WebContext";
import { MdEditDocument, MdArrowBack } from "react-icons/md";

const UpdateScholarship = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(WebContext);
  const [submitting, setSubmitting] = useState(false);

  // Fetch existing data
  const { data: existing, isLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/scholarship/data/${id}`);
      return res.data;
    },
    retry: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const f = e.target;
      const payload = {
        scholarshipName: f.scholarshipName.value.trim(),
        universityName: f.universityName.value.trim(),
        universityImage: f.universityImageUrl.value.trim(),
        universityCountry: f.universityCountry.value.trim(),
        universityCity: f.universityCity.value.trim(),
        universityWorldRank: Number(f.universityWorldRank.value || 0),
        subjectCategory: f.subjectCategory.value.trim(),
        scholarshipCategory: f.scholarshipCategory.value,
        degree: f.degree.value,
        tuitionFees: f.tuitionFees.value ? Number(f.tuitionFees.value) : null,
        applicationFees: Number(f.applicationFees.value || 0),
        serviceCharge: Number(f.serviceCharge.value || 0),
        applicationDeadline: f.applicationDeadline.value,
        postedDate: existing.postedDate,
        postedUserEmail: existing.postedUserEmail,
      };

      const res = await axiosSecure.put(`/scholarship/update/${id}`, payload);

      if (res?.status === 200) {
        toast.success("Scholarship updated successfully!");
        navigate("/dashboard/manage-scholarships");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <DataLoader />;
  if (!existing)
    return (
      <div className="text-center py-20 font-black opacity-40">
        NO DATA FOUND
      </div>
    );

  const inputClass = `w-full px-4 py-3 rounded-2xl border outline-none transition-all ${
    theme === "dark"
      ? "bg-slate-900 border-slate-800 text-white focus:border-sky-500"
      : "bg-gray-50 border-gray-200 text-slate-700 focus:border-sky-500 focus:bg-white"
  }`;

  const labelClass =
    "text-xs font-black uppercase tracking-widest opacity-60 mb-2 block ml-1";

  return (
    <div className="w-full mx-auto p-2 sm:p-4 md:p-8">
      <HeadProvider>
        <Title>Update Scholarship || ScholarStream</Title>
      </HeadProvider>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-3 rounded-2xl bg-slate-500/10 hover:bg-sky-500 hover:text-white transition-all"
          >
            <MdArrowBack size={20} />
          </button>
          <div>
            <h2
              className={`md:text-3xl text-2xl font-black tracking-tight ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Update Scholarship
            </h2>
            <p className="opacity-60 font-medium">
              Modify the details of the selected scholarship program.
            </p>
          </div>
        </div>
        <MdEditDocument className="text-5xl opacity-10 hidden md:block" />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`sm:p-8 p-4 rounded-4xl border ${
          theme === "dark"
            ? "bg-slate-900/50 border-slate-800 shadow-2xl shadow-black/20"
            : "bg-white border-gray-100 shadow-xl shadow-gray-200/50"
        }`}
      >
        <div className="grid gap-6">
          {/* Section 1: Basic Info */}
          <div className="space-y-4">
            <h3 className="text-sky-500 font-black text-sm uppercase tracking-tighter flex items-center gap-2">
              <span className="h-1 w-4 bg-sky-500 rounded-full"></span> Basic
              Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Scholarship Name</label>
                <input
                  name="scholarshipName"
                  defaultValue={existing.scholarshipName}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Subject Category</label>
                <input
                  name="subjectCategory"
                  defaultValue={existing.subjectCategory}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: University Details */}
          <div className="space-y-4 pt-4">
            <h3 className="text-purple-500 font-black text-sm uppercase tracking-tighter flex items-center gap-2">
              <span className="h-1 w-4 bg-purple-500 rounded-full"></span>{" "}
              University Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>University Name</label>
                <input
                  name="universityName"
                  defaultValue={existing.universityName}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>University Image URL</label>
                <input
                  name="universityImageUrl"
                  defaultValue={existing.universityImage}
                  className={inputClass}
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Country</label>
                <input
                  name="universityCountry"
                  defaultValue={existing.universityCountry}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>City</label>
                <input
                  name="universityCity"
                  defaultValue={existing.universityCity}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>World Rank</label>
                <input
                  name="universityWorldRank"
                  type="number"
                  defaultValue={existing.universityWorldRank}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Categories & Fees */}
          <div className="space-y-4 pt-4">
            <h3 className="text-amber-500 font-black text-sm uppercase tracking-tighter flex items-center gap-2">
              <span className="h-1 w-4 bg-amber-500 rounded-full"></span>{" "}
              Category & Pricing
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Scholarship Category</label>
                <select
                  name="scholarshipCategory"
                  defaultValue={existing.scholarshipCategory}
                  className={inputClass}
                >
                  <option value="Full fund">Full fund</option>
                  <option value="Partial">Partial</option>
                  <option value="Self-fund">Self-fund</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Degree Level</label>
                <select
                  name="degree"
                  defaultValue={existing.degree}
                  className={inputClass}
                >
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Tuition Fees</label>
                <input
                  name="tuitionFees"
                  type="number"
                  defaultValue={existing.tuitionFees}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Application Fees</label>
                <input
                  name="applicationFees"
                  type="number"
                  defaultValue={existing.applicationFees}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Service Charge</label>
                <input
                  name="serviceCharge"
                  type="number"
                  defaultValue={existing.serviceCharge}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Deadlines & Read-only */}
          <div className="space-y-4 pt-4">
            <h3 className="text-emerald-500 font-black text-sm uppercase tracking-tighter flex items-center gap-2">
              <span className="h-1 w-4 bg-emerald-500 rounded-full"></span> Date
              & Constraints
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Application Deadline</label>
                <input
                  name="applicationDeadline"
                  type="date"
                  defaultValue={existing.applicationDeadline?.slice(0, 10)}
                  className={inputClass}
                  required
                />
              </div>
              <div className="opacity-50">
                <label className={labelClass}>Original Post Date</label>
                <input
                  name="postedDate"
                  type="text"
                  defaultValue={new Date(
                    existing.postedDate
                  ).toLocaleDateString()}
                  className={inputClass}
                  readOnly
                />
              </div>
              <div className="opacity-50">
                <label className={labelClass}>Posted By</label>
                <input
                  name="postedUserEmail"
                  defaultValue={existing.postedUserEmail}
                  className={inputClass}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className={`mt-6 w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl ${
              submitting
                ? "bg-slate-500 opacity-50 cursor-not-allowed"
                : "bg-sky-500 hover:bg-sky-600 text-white shadow-sky-500/20 active:scale-[0.98]"
            }`}
          >
            {submitting ? "Updating Database..." : "Update Scholarship Data"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateScholarship;
