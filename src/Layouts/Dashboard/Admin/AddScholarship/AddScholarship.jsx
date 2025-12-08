import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  Divider,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import WebContext from "../../../../Context/WebContext";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";

const image_API = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMG_HOSTING_API
}`;

const AddScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(WebContext); // to get postedUserEmail
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  // host image if file provided
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
      const scholarshipName = f.scholarshipName.value.trim();
      const universityName = f.universityName.value.trim();
      const universityImageFile = f.universityImageFile.files[0]; // optional file
      const universityImageUrl = f.universityImageUrl.value.trim(); // optional url
      const universityCountry = f.universityCountry.value.trim();
      const universityCity = f.universityCity.value.trim();
      const universityWorldRank = Number(f.universityWorldRank.value || 0);
      const subjectCategory = f.subjectCategory.value.trim();
      const scholarshipCategory = f.scholarshipCategory.value;
      const degree = f.degree.value;
      const tuitionFees = f.tuitionFees.value
        ? Number(f.tuitionFees.value)
        : null;
      const applicationFees = Number(f.applicationFees.value || 0);
      const serviceCharge = Number(f.serviceCharge.value || 0);
      const applicationDeadline = f.applicationDeadline.value;
      const scholarshipPostDate =
        f.scholarshipPostDate.value || new Date().toISOString();

      // basic validation
      if (
        !scholarshipName ||
        !universityName ||
        !universityCountry ||
        !applicationFees
      ) {
        toast.error(
          "Please fill required fields (scholarshipName, universityName, country, applicationFees).",
          { autoClose: 3000 }
        );
        setSubmitting(false);
        return;
      }

      // upload image if file provided, else use image URL
      let finalImage = "";
      if (universityImageFile) {
        const hosted = await hostImage(universityImageFile);
        if (!hosted) {
          toast.error(
            "Image upload failed. Provide a valid image URL instead.",
            { autoClose: 3000 }
          );
          setSubmitting(false);
          return;
        }
        finalImage = hosted;
      } else if (universityImageUrl) {
        finalImage = universityImageUrl;
      } else {
        finalImage = ""; // optional, you can set a placeholder image URL
      }
      if (!finalImage)
        return toast.error("Provide a valid image.", {
          autoClose: 3000,
        });
      const payload = {
        scholarshipName,
        universityName,
        universityImage: finalImage,
        universityCountry,
        universityCity,
        universityWorldRank,
        subjectCategory,
        scholarshipCategory,
        degree,
        tuitionFees,
        applicationFees,
        serviceCharge,
        applicationDeadline,
        scholarshipPostDate,
        postedUserEmail: user?.email || "unknown",
      };

      const res = await axiosSecure.post("/scholarships", payload);
      if (res?.status === 200 || res?.status === 201) {
        toast.success("Scholarship added successfully", { autoClose: 2000 });
        f.reset();
        navigate("/dashboard/manage-scholarships");
      } else {
        toast.error("Failed to add scholarship", { autoClose: 3000 });
      }
    } catch (err) {
      console.error(err);
      toast.error(`Error: ${err?.message || "Something went wrong"}`, {
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto md:p-6 p-2 bg-white rounded-md shadow-sm w-full">
      <h2 className="sm:text-2xl text-xl md:text-3xl font-semibold mb-2">
        Add Scholarship
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Fill scholarship details carefully. Required fields are marked.
      </p>

      <Divider flexItem />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
        <TextField
          name="scholarshipName"
          label="Scholarship Name *"
          required
          fullWidth
        />
        <TextField
          name="universityName"
          label="University Name *"
          required
          fullWidth
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            name="universityImageUrl"
            label="University Image URL (optional)"
            fullWidth
          />
          <div>
            <label className="block mb-1 text-sm font-medium">
              Or Upload University Image (optional)
            </label>
            <input
              name="universityImageFile"
              type="file"
              accept="image/*"
              className="w-full border p-1"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <TextField name="universityCountry" label="Country *" required />
          <TextField name="universityCity" label="City" />
          <TextField
            name="universityWorldRank"
            label="World Rank"
            type="number"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <TextField
            name="subjectCategory"
            label="Subject Category *"
            required
          />
          <TextField
            name="scholarshipCategory"
            select
            label="Scholarship Category *"
            defaultValue="Partial"
            required
          >
            <MenuItem value="Full fund">Full fund</MenuItem>
            <MenuItem value="Partial">Partial</MenuItem>
            <MenuItem value="Self-fund">Self-fund</MenuItem>
          </TextField>

          <TextField
            name="degree"
            select
            label="Degree *"
            defaultValue="Bachelor"
            required
          >
            <MenuItem value="Diploma">Diploma</MenuItem>
            <MenuItem value="Bachelor">Bachelor</MenuItem>
            <MenuItem value="Masters">Masters</MenuItem>
            <MenuItem value="PhD">PhD</MenuItem>
          </TextField>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <TextField
            name="tuitionFees"
            label="Tuition Fees (optional)"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            name="applicationFees"
            label="Application Fees *"
            type="number"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            name="serviceCharge"
            label="Service Charge"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <TextField
            name="applicationDeadline"
            label="Application Deadline"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="scholarshipPostDate"
            label="Post Date"
            type="date"
            defaultValue={new Date().toISOString().slice(0, 10)}
            InputLabelProps={{ shrink: true }}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="contained" disabled={submitting}>
            {submitting ? "Submitting..." : "Add Scholarship"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;
