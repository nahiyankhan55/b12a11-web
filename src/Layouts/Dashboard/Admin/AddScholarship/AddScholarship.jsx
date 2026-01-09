import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import WebContext from "../../../../Context/WebContext";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import { HeadProvider, Title } from "react-head";
import { MdCloudUpload, MdAddCircleOutline } from "react-icons/md";

const image_API = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMG_HOSTING_API
}`;

const AddScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user, theme } = useContext(WebContext);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const hostImage = async (file) => {
    if (!file) return null;
    const form = new FormData();
    form.append("image", file);
    const res = await axiosPublic.post(image_API, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res?.data?.data?.url || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const f = e.target;
      const payload = {
        scholarshipName: f.scholarshipName.value,
        universityName: f.universityName.value,
        universityCountry: f.universityCountry.value,
        universityCity: f.universityCity.value,
        universityWorldRank: Number(f.universityWorldRank.value),
        subjectCategory: f.subjectCategory.value,
        scholarshipCategory: f.scholarshipCategory.value,
        degree: f.degree.value,
        tuitionFees: f.tuitionFees.value ? Number(f.tuitionFees.value) : null,
        applicationFees: Number(f.applicationFees.value),
        serviceCharge: Number(f.serviceCharge.value),
        applicationDeadline: f.applicationDeadline.value,
        scholarshipPostDate: f.scholarshipPostDate.value,
        postedDate: new Date().toISOString(),
        postedUserEmail: user?.email || "unknown",
      };

      const universityImageFile = f.universityImageFile.files[0];
      const universityImageUrl = f.universityImageUrl.value.trim();

      let finalImage = "";
      if (universityImageFile) {
        finalImage = await hostImage(universityImageFile);
      } else {
        finalImage = universityImageUrl;
      }

      if (!finalImage) {
        setSubmitting(false);
        return toast.error("Please provide a university image.");
      }

      payload.universityImage = finalImage;

      const res = await axiosSecure.post("/scholarships", payload);
      if (res.data.insertedId) {
        toast.success("Scholarship added successfully!");
        navigate("/dashboard/manage-scholarships");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 ${
    theme === "dark"
      ? "bg-slate-800 border-slate-700 text-white focus:border-sky-500"
      : "bg-gray-50 border-gray-200 focus:border-sky-500"
  }`;

  const labelClass = `block text-sm font-bold mb-2 ${
    theme === "dark" ? "text-slate-400" : "text-slate-600"
  }`;

  return (
    <div className="max-w-5xl mx-auto duration-700">
      <HeadProvider>
        <Title>Add Scholarship || ScholarStream</Title>
      </HeadProvider>

      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 p-2 sm:p-8">
        <div>
          <h2
            className={`text-3xl font-black tracking-tight ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Add New Scholarship
          </h2>
          <p className="opacity-60 font-medium">
            Create a new opportunity for aspiring scholars.
          </p>
        </div>
        <div className="h-12 w-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center text-2xl">
          <MdAddCircleOutline />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`sm:p-8 px-4 rounded-4xl border transition-all duration-300 ${
          theme === "dark"
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-gray-100 shadow-xl shadow-gray-200/50"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Scholarship Name *</label>
              <input
                name="scholarshipName"
                required
                className={inputClass}
                placeholder="e.g. Global Excellence Award"
              />
            </div>
            <div>
              <label className={labelClass}>University Name *</label>
              <input
                name="universityName"
                required
                className={inputClass}
                placeholder="e.g. Oxford University"
              />
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="space-y-4">
            <label className={labelClass}>University Image</label>
            <div
              className={`relative border-2 border-dashed rounded-2xl p-4 text-center group transition-all ${
                theme === "dark"
                  ? "border-slate-700 hover:border-sky-500"
                  : "border-gray-200 hover:border-sky-500"
              }`}
            >
              <MdCloudUpload className="mx-auto text-4xl text-sky-500 mb-2" />
              <input
                type="file"
                name="universityImageFile"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <p className="text-xs font-bold opacity-60">
                Click to upload or drag & drop
              </p>
            </div>
            <input
              name="universityImageUrl"
              className={inputClass}
              placeholder="Or paste image URL here..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <label className={labelClass}>Country *</label>
            <input name="universityCountry" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>City</label>
            <input name="universityCity" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>World Rank</label>
            <input
              type="number"
              name="universityWorldRank"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <label className={labelClass}>Subject Category *</label>
            <input
              name="subjectCategory"
              required
              className={inputClass}
              placeholder="e.g. Engineering"
            />
          </div>
          <div>
            <label className={labelClass}>Scholarship Category *</label>
            <select name="scholarshipCategory" className={inputClass}>
              <option value="Full fund">Full fund</option>
              <option value="Partial">Partial</option>
              <option value="Self-fund">Self-fund</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Degree *</label>
            <select name="degree" className={inputClass}>
              <option value="Bachelor">Bachelor</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
              <option value="Diploma">Diploma</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <label className={labelClass}>Tuition Fees ($)</label>
            <input type="number" name="tuitionFees" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Application Fees * ($)</label>
            <input
              type="number"
              name="applicationFees"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Service Charge ($)</label>
            <input type="number" name="serviceCharge" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className={labelClass}>Application Deadline</label>
            <input
              type="date"
              name="applicationDeadline"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Post Date</label>
            <input
              type="date"
              name="scholarshipPostDate"
              defaultValue={new Date().toISOString().split("T")[0]}
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-10 py-4 bg-sky-500 text-white font-black rounded-2xl hover:bg-sky-600 transition-all shadow-lg shadow-sky-500/20 disabled:bg-slate-400"
          >
            {submitting ? "Processing..." : "Submit Scholarship"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;
