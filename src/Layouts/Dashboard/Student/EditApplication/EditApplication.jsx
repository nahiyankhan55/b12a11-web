import { useState, useEffect } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import DataLoader from "../../../../Components/DataLoader";
import { HeadProvider, Title } from "react-head";

const EditApplication = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  // get previous state (optional)
  const previous = location.state?.app || null;

  // GET single application
  const { data: appData, isLoading } = useQuery({
    queryKey: ["single-application", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/details/${id}`);
      return res.data;
    },
    retry: 3,
  });
  console.log(appData);

  const [form, setForm] = useState({
    scholarshipName: "",
    universityName: "",
    userName: "",
    applicant: "",
    address: "",
  });

  // load data into form
  useEffect(() => {
    if (appData) {
      setForm({
        scholarshipName: appData.scholarshipName || "",
        universityName: appData.universityName || "",
        userName: appData.userName || "",
        applicant: appData.applicant || "",
        address: appData.address || "",
      });
    }
  }, [appData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // UPDATE MUTATION
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosSecure.put(`/applications/${id}`, form);
    },
    onSuccess: () => {
      toast.success("Application updated!");
      queryClient.invalidateQueries(["applications"]);
      navigate("/dashboard/my-applications");
    },
    onError: () => {
      toast.error("Failed to update application.");
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  if (isLoading) return <DataLoader />;

  return (
    <div style={{ maxWidth: "650px", margin: "0 auto", padding: "20px" }}>
      <HeadProvider>
        <Title>Edit Application || ScholarStream</Title>
      </HeadProvider>
      <h2 className="text-xl font-bold mb-5">Edit Application</h2>

      <div className="mb-4">
        <TextField
          fullWidth
          label="Scholarship Name"
          name="scholarshipName"
          value={form.scholarshipName}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <TextField
          fullWidth
          label="University Name"
          name="universityName"
          value={form.universityName}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <TextField
          fullWidth
          label="Applicant Name"
          name="userName"
          value={form.userName}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              endAdornment: <InputAdornment position="end"></InputAdornment>,
            },
          }}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <TextField
          fullWidth
          label="Email"
          name="applicant"
          value={form.applicant}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            },
          }}
          onChange={handleChange}
        />
      </div>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={mutation.isPending}
      >
        Update Application
      </Button>
    </div>
  );
};

export default EditApplication;
