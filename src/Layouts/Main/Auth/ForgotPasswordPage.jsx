import { Button, TextField, Typography, Box, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { HeadProvider, Title } from "react-head";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import WebContext from "../../../Context/WebContext";
import auth from "../../../Firebase/firebase.config";
import { LockReset, ArrowBack } from "@mui/icons-material";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(WebContext);
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!", {
          position: "top-center",
          autoClose: 2000,
        });
        setLoading(false);
        setEmail("");
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 2000,
        });
        setLoading(false);
      });
  };

  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center py-16 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-950 text-gray-300"
          : "bg-gray-50 text-gray-700"
      }`}
    >
      <HeadProvider>
        <Title>Forgot Password || ScholarStream</Title>
      </HeadProvider>

      <div className="max-w-md w-full px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 opacity-60 hover:opacity-100 transition-opacity font-bold text-sm uppercase tracking-widest"
        >
          <ArrowBack fontSize="small" /> Back
        </button>

        <div
          className={`p-10 rounded-4xl border transition-all duration-300 ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800 shadow-2xl shadow-black/20"
              : "bg-white border-gray-100 shadow-xl"
          }`}
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-3xl bg-sky-500/10 text-sky-500">
                <LockReset sx={{ fontSize: 45 }} />
              </div>
            </div>

            {/* 3xl Title Rule */}
            <h1
              className={`md:text-3xl text-2xl font-black mb-3 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Forgot <span className="text-sky-500">Password?</span>
            </h1>

            {/* sm:text-lg Body Text Rule */}
            <p className="sm:text-lg text-sm opacity-70 leading-relaxed">
              No worries! Enter your email below and we'll send you a recovery
              link.
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="space-y-6">
            <TextField
              required
              fullWidth
              type="email"
              label="Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                style: {
                  borderRadius: "16px",
                  color: theme === "dark" ? "#fff" : "inherit",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme === "dark" ? "#334155" : "#e2e8f0",
                  },
                  "&:hover fieldset": { borderColor: "#0ea5e9" },
                },
                "& .MuiInputLabel-root": {
                  color: theme === "dark" ? "#94a3b8" : "#64748b",
                },
              }}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-2 bg-linear-to-r from-purple-600 to-sky-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-sky-500/20 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
            >
              {loading ? "Sending link..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm opacity-60">
              Remember your password?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-sky-500 font-bold hover:underline"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
