import { useState } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import DataLoader from "../../../../Components/DataLoader";
import { HeadProvider, Title } from "react-head";

const UpdateScholarship = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // Fetch existing data
  const { data: existing, isLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/scholarship/data/${id}`);
      return res.data;
    },
    retry: 0,
  });
  console.log(existing);
  const [submitting, setSubmitting] = useState(false);

  if (isLoading) return <DataLoader></DataLoader>;
  if (!existing)
    return (
      <p className="py-10 px-1 font-medium text-orange-600 text-center">
        No data found
      </p>
    );

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
        postedDate: f.postedDate.value || existing.postedDate,
        postedUserEmail: existing.postedUserEmail,
      };

      const res = await axiosSecure.put(`/scholarship/update/${id}`, payload);

      if (res?.status === 200) {
        toast.success("Updated successfully", { autoClose: 2000 });
        navigate("/dashboard/manage-scholarships");
      } else {
        toast.error("Update failed", { autoClose: 3000 });
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto md:p-6 p-1 shadow-lg rounded-md">
      <HeadProvider>
        <Title>Update Scholarship || ScholarStream</Title>
      </HeadProvider>
      <h2 className="sm:text-2xl md:text-3xl text-xl font-semibold mb-4">
        Update Scholarship
      </h2>

      <form onSubmit={handleSubmit} className="grid gap-4 w-full">
        <TextField
          name="scholarshipName"
          label="Scholarship Name"
          defaultValue={existing.scholarshipName}
          fullWidth
          required
        />

        <div className="grid md:grid-cols-2 gap-4">
          <TextField
            name="universityName"
            label="University Name"
            defaultValue={existing.universityName}
            fullWidth
            required
          />

          <TextField
            name="universityImageUrl"
            label="University Image URL"
            defaultValue={existing.universityImage}
            fullWidth
            required
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <TextField
            name="universityCountry"
            label="Country"
            defaultValue={existing.universityCountry}
            fullWidth
            required
          />

          <TextField
            name="universityCity"
            label="City"
            defaultValue={existing.universityCity}
            fullWidth
          />

          <TextField
            name="universityWorldRank"
            label="World Rank"
            type="number"
            defaultValue={existing.universityWorldRank}
            fullWidth
          />
        </div>
        <TextField
          name="subjectCategory"
          label="Subject Category"
          defaultValue={existing.subjectCategory}
          fullWidth
        />

        <div className="grid md:grid-cols-2 gap-4">
          <TextField
            select
            name="scholarshipCategory"
            label="Scholarship Category"
            defaultValue={existing.scholarshipCategory}
            fullWidth
          >
            <MenuItem value="Full fund">Full fund</MenuItem>
            <MenuItem value="Partial">Partial</MenuItem>
            <MenuItem value="Self-fund">Self-fund</MenuItem>
          </TextField>

          <TextField
            select
            name="degree"
            label="Degree"
            defaultValue={existing.degree}
            fullWidth
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
            type="number"
            label="Tuition Fees"
            defaultValue={existing.tuitionFees}
            fullWidth
          />
          <TextField
            name="applicationFees"
            type="number"
            label="Application Fees"
            defaultValue={existing.applicationFees}
            required
          />
          <TextField
            name="serviceCharge"
            type="number"
            label="Service Charge"
            defaultValue={existing.serviceCharge}
          />
        </div>

        <TextField
          name="applicationDeadline"
          type="date"
          label="Application Deadline"
          defaultValue={existing.applicationDeadline?.slice(0, 10)}
          InputLabelProps={{ shrink: true }}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <TextField
            name="postedDate"
            type="datetime-local"
            label="Post Date"
            defaultValue={existing.postedDate?.slice(0, 16)}
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: true }}
          />
          <TextField
            name="postedUserEmail"
            label="Posted User Email"
            defaultValue={existing.postedUserEmail}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          disabled={submitting}
          sx={{ mt: 2 }}
        >
          {submitting ? "Updating..." : "Update Scholarship"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateScholarship;
