import { useState, useEffect, useContext } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import DataLoader from "../../../../Components/DataLoader";
import { HeadProvider, Title } from "react-head";
import WebContext from "../../../../Context/WebContext";
import {
  MdArrowBack,
  MdOutlineDriveFileRenameOutline,
  MdOutlineBusiness,
  MdOutlinePerson,
  MdOutlineMail,
  MdUpdate,
} from "react-icons/md";

const EditApplication = () => {
  const { theme } = useContext(WebContext);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    scholarshipName: "",
    universityName: "",
    userName: "",
    applicant: "",
    address: "",
  });

  // GET single application
  const { data: appData, isLoading } = useQuery({
    queryKey: ["single-application", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/details/${id}`);
      return res.data;
    },
  });

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

  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosSecure.put(`/applications/${id}`, form);
    },
    onSuccess: () => {
      toast.success("Changes saved successfully!");
      queryClient.invalidateQueries(["applications"]);
      navigate("/dashboard/my-applications");
    },
    onError: () => {
      toast.error("Failed to update application.");
    },
  });

  if (isLoading) return <DataLoader />;

  // Common styles for TextField
  const fieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "1.2rem",
      backgroundColor:
        theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
      color: theme === "dark" ? "#fff" : "#000",
      "& fieldset": { borderColor: "rgba(56, 189, 248, 0.1)" },
      "&:hover fieldset": { borderColor: "rgba(56, 189, 248, 0.3)" },
      "&.Mui-focused fieldset": { borderColor: "#0ea5e9" },
    },
    "& .MuiInputLabel-root": {
      color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
      "&.Mui-focused": { color: "#0ea5e9" },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <HeadProvider>
        <Title>Edit Application || ScholarStream</Title>
      </HeadProvider>

      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <IconButton
          onClick={() => navigate(-1)}
          className={`${
            theme === "dark"
              ? "bg-slate-800 text-white"
              : "bg-gray-100 text-black"
          } hover:bg-sky-500 hover:text-white transition-all`}
        >
          <MdArrowBack />
        </IconButton>
        <div>
          <h2
            className={`text-3xl font-black tracking-tight ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Edit Application
          </h2>
          <p className="text-[10px] uppercase font-black opacity-40 tracking-[0.2em]">
            Application ID: {id}
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div
        className={`p-8 rounded-[2.5rem] border transition-all ${
          theme === "dark"
            ? "bg-slate-900 border-slate-800 shadow-2xl shadow-sky-900/10"
            : "bg-white border-gray-100 shadow-xl shadow-gray-200/50"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scholarship Name */}
          <div className="md:col-span-2">
            <p className="text-[10px] font-black uppercase opacity-40 mb-2 ml-2 tracking-widest">
              Scholarship Information
            </p>
            <TextField
              fullWidth
              label="Scholarship Name"
              name="scholarshipName"
              value={form.scholarshipName}
              onChange={handleChange}
              sx={fieldStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdOutlineDriveFileRenameOutline className="text-sky-500" />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* University Name */}
          <div className="md:col-span-2">
            <TextField
              fullWidth
              label="University Name"
              name="universityName"
              value={form.universityName}
              onChange={handleChange}
              sx={fieldStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdOutlineBusiness className="text-sky-500" />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="md:col-span-2 mt-4">
            <p className="text-[10px] font-black uppercase opacity-40 mb-2 ml-2 tracking-widest">
              Applicant Details
            </p>
          </div>

          {/* User Name */}
          <TextField
            fullWidth
            label="Full Name"
            name="userName"
            value={form.userName}
            onChange={handleChange}
            sx={fieldStyles}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdOutlinePerson className="text-sky-500" />
                </InputAdornment>
              ),
            }}
          />

          {/* Email/Applicant */}
          <TextField
            fullWidth
            label="Email Address"
            name="applicant"
            value={form.applicant}
            onChange={handleChange}
            sx={fieldStyles}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdOutlineMail className="text-sky-500" />
                </InputAdornment>
              ),
            }}
          />

          {/* Address */}
          <div className="md:col-span-2">
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Contact Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              sx={fieldStyles}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-10">
          <button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            className={`w-full py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-lg ${
              mutation.isPending
                ? "bg-slate-500/20 text-slate-500 cursor-not-allowed"
                : "bg-sky-500 hover:bg-sky-600 text-white shadow-sky-500/20 hover:scale-[1.01] active:scale-95"
            }`}
          >
            {mutation.isPending ? (
              <span className="animate-pulse">Updating...</span>
            ) : (
              <>
                <MdUpdate size={20} />
                Save Changes
              </>
            )}
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full mt-4 py-3 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
          >
            Cancel and Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditApplication;
