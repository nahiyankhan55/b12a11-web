import { useContext, useState } from "react";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import WebContext from "../../../Context/WebContext";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Divider, TextField, InputAdornment } from "@mui/material";
import {
  MdVisibility,
  MdVisibilityOff,
  MdOutlineMailOutline,
  MdLockOutline,
  MdAdminPanelSettings,
  MdSecurity,
  MdSchool,
} from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { HeadProvider, Title } from "react-head";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const AxiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    theme,
    handleLoginEmail,
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

  const fillCredentials = (roleEmail) => {
    setEmail(roleEmail);
    setPassword("ABC@123abc");
    toast.info(`Credentials filled for ${roleEmail.split("@")[0]}`, {
      autoClose: 1000,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    handleLoginEmail(email, password)
      .then((result) => {
        const loggedUser = result.user;
        setUser(loggedUser);
        setUserName(loggedUser.displayName);
        setUserImage(loggedUser.photoURL);
        navigate("/");
        toast.success("Login Successful");
      })
      .catch((error) => toast.error(`Login Error: ${error.message}`));
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
      toast.success("Google Login Successful");
      navigate("/");
    });
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      color: theme === "dark" ? "#f1f5f9" : "#1e293b",
      "& fieldset": { borderColor: theme === "dark" ? "#334155" : "#e2e8f0" },
      "&:hover fieldset": { borderColor: "#0ea5e9" },
    },
    "& .MuiInputLabel-root": {
      color: theme === "dark" ? "#94a3b8" : "#64748b",
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
        <Title>Login || ScholarStream</Title>
      </HeadProvider>

      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-10">
          <h1
            className={`md:text-3xl text-2xl font-black mb-3 ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Welcome <span className="text-sky-500">Back</span>
          </h1>
          <p className="sm:text-lg text-sm opacity-70">
            Access your account to continue
          </p>
        </div>

        <div
          className={`p-8 md:p-12 rounded-4xl border transition-all duration-300 ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800 shadow-2xl shadow-black/20"
              : "bg-white border-gray-100 shadow-xl"
          }`}
        >
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={inputStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdLockOutline className="text-xl" />
                  </InputAdornment>
                ),
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

            <button className="w-full py-4 bg-linear-to-r from-purple-600 to-teal-500 text-white font-black rounded-2xl shadow-lg hover:shadow-teal-500/20 transition-all hover:scale-[1.01] active:scale-95">
              Login Now
            </button>
          </form>

          {/* Quick Login Section */}
          <div className="mt-8 space-y-4">
            <p className="text-center text-xs font-bold uppercase tracking-widest opacity-40">
              Quick Access (Auto-fill)
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => fillCredentials("admin@mailinator.com")}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all font-bold text-sm"
              >
                <MdAdminPanelSettings /> Admin
              </button>
              <button
                onClick={() => fillCredentials("moderator@mailinator.com")}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-xl transition-all font-bold text-sm"
              >
                <MdSecurity /> Moderator
              </button>
              <button
                onClick={() => fillCredentials("student@mailinator.com")}
                className="flex items-center gap-2 px-4 py-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-500 rounded-xl transition-all font-bold text-sm"
              >
                <MdSchool /> Student
              </button>
            </div>
          </div>

          <div className="my-8 flex items-center gap-4">
            <Divider className="flex-1 opacity-10" />
            <span className="text-sm font-bold opacity-30 uppercase tracking-widest">
              OR
            </span>
            <Divider className="flex-1 opacity-10" />
          </div>

          <button
            onClick={handleGoogleMethod}
            className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl border font-bold transition-all hover:scale-[1.01] ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700 hover:bg-slate-700"
                : "bg-white border-gray-200 hover:bg-gray-50"
            }`}
          >
            <FcGoogle className="text-2xl" /> Login with Google
          </button>

          <div className="mt-10 text-center space-y-3">
            <p className="text-sm opacity-60">
              New to ScholarStream?{" "}
              <Link
                to="/register"
                className="text-sky-500 font-bold hover:underline"
              >
                Register
              </Link>
            </p>
            <Link
              to="/forgot"
              className="block text-xs font-black uppercase tracking-widest text-orange-500 opacity-60 hover:opacity-100 transition-opacity"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
