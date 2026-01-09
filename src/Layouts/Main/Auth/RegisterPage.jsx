import { useContext, useState } from "react";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import WebContext from "../../../Context/WebContext";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  Divider,
  TextField,
  InputAdornment,
  MenuItem,
  Card,
} from "@mui/material";
import {
  MdVisibility,
  MdVisibilityOff,
  MdOutlineDriveFileRenameOutline,
  MdOutlinePhotoCamera,
  MdOutlineMailOutline,
} from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { HeadProvider, Title } from "react-head";
import { updateProfile } from "firebase/auth";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const AxiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { theme } = useContext(WebContext);

  const {
    handleRegisterEmail,
    handleGoogle,
    setUser,
    setUserName,
    setUserImage,
  } = useContext(WebContext);

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/users");
      return res.data;
    },
  });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    const name = target.name.value;
    const email = target.email.value;
    const password = target.password.value;
    const role = target.role.value || "Student";
    const image = target.image.value || "";

    const exists = users.find((u) => u.email === email);
    if (exists) {
      toast.error("User already exists with this email");
      return;
    }

    handleRegisterEmail(email, password)
      .then((result) => {
        const newUser = result.user;
        updateProfile(newUser, { displayName: name, photoURL: image });
        setUser(newUser);
        setUserName(name);
        setUserImage(image || newUser.photoURL || "");

        const toDB = {
          name,
          email,
          image: image || newUser.photoURL || "",
          role,
        };
        AxiosPublic.post("/users", toDB);

        toast.success("Registration Successful");
        navigate("/");
      })
      .catch((error) => toast.error(`Register Error: ${error.message}`));
  };

  const handleGoogleMethod = () => {
    handleGoogle().then((result) => {
      const user = result.user;
      setUser(user);
      setUserName(user.displayName);
      setUserImage(user.photoURL);

      const exists = users.find((u) => u.email === user.email);
      if (!exists) {
        const newUser = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          role: "Student",
        };
        AxiosPublic.post("/users", newUser);
      }
      toast.success("Login Successful");
      navigate("/");
    });
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      color: theme === "dark" ? "#f1f5f9" : "#1e293b",
      "& fieldset": {
        borderColor: theme === "dark" ? "#334155" : "#e2e8f0",
      },
      "&:hover fieldset": {
        borderColor: "#0ea5e9",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#0ea5e9",
      },
    },
    "& .MuiInputLabel-root": {
      color: theme === "dark" ? "#94a3b8" : "#64748b",
      "&.Mui-focused": {
        color: "#0ea5e9",
      },
    },
    "& .MuiOutlinedInput-input": {
      "&::placeholder": {
        color: theme === "dark" ? "#94a3b8" : "#64748b",
        opacity: 1,
      },
    },
    "& .MuiInputAdornment-root": {
      color: theme === "dark" ? "#94a3b8" : "#64748b",
    },
  };

  return (
    <div
      className={`w-full min-h-screen py-16 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-950 text-gray-300"
          : "bg-gray-50 text-gray-700"
      }`}
    >
      <HeadProvider>
        <Title>Register || ScholarStream</Title>
      </HeadProvider>

      <div className="max-w-4xl mx-auto sm:px-6 px-2">
        <div className="text-center mb-10">
          <h1
            className={`md:text-3xl text-2xl font-black mb-3 ${
              theme === "dark" ? "text-white!" : "text-slate-900"
            }`}
          >
            Join <span className="text-sky-500">ScholarStream</span>
          </h1>
          <p className="sm:text-lg text-sm opacity-70">
            Create an account to start your journey
          </p>
        </div>

        <div
          className={`sm:p-8 p-4 md:p-12 rounded-4xl border transition-all duration-300 ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800 shadow-2xl shadow-black/20"
              : "bg-white border-gray-100 shadow-xl"
          }`}
        >
          <form onSubmit={handleRegisterSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                name="name"
                label="Full Name"
                required
                fullWidth
                sx={inputStyle}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdOutlineDriveFileRenameOutline className="text-xl" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                required
                fullWidth
                sx={inputStyle}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdOutlineMailOutline className="text-xl" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="image"
                label="Photo URL"
                fullWidth
                sx={inputStyle}
                placeholder="https://image-link.com"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdOutlinePhotoCamera className="text-xl" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="role"
                select
                label="Register As"
                defaultValue="Student"
                fullWidth
                sx={inputStyle}
              >
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Moderator">Moderator</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </TextField>
            </div>

            <TextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              required
              fullWidth
              sx={inputStyle}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <MdVisibilityOff className="text-2xl" />
                      ) : (
                        <MdVisibility className="text-2xl" />
                      )}
                    </button>
                  </InputAdornment>
                ),
              }}
            />

            <button className="w-full py-4 bg-linear-to-r mt-4 from-purple-600 to-sky-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-sky-500/20 transition-all hover:scale-[1.01] active:scale-95">
              Create Account
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <Divider className="flex-1 opacity-10" />
            <span className="text-sm font-bold opacity-30 uppercase tracking-widest">
              OR
            </span>
            <Divider className="flex-1 opacity-10" />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={handleGoogleMethod}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl border font-bold transition-all hover:scale-[1.01] ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 hover:bg-slate-700"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              <FcGoogle className="text-2xl" /> Continue with Google
            </button>
          </div>

          <div className="mt-10 text-center space-y-3">
            <p className="text-sm opacity-60">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-sky-500 font-bold hover:underline"
              >
                Login
              </Link>
            </p>
            <Link
              to="/forgot"
              className="block text-xs font-bold uppercase tracking-tighter text-orange-500 opacity-60 hover:opacity-100 transition-opacity"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
