import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { HeadProvider, Title } from "react-head";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import WebContext from "../../../Context/WebContext";
import auth from "../../../Firebase/firebase.config";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(WebContext);

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
      className={`flex justify-center items-center h-full w-full ${
        theme === "dark" ? "bg-gray-600" : "bg-gray-100"
      } px-5 py-10`}
    >
      <HeadProvider>
        <Title>Forgot Password || ScholarStream</Title>
      </HeadProvider>
      <Card
        sx={{
          maxWidth: 450,
          width: "100%",
          boxShadow: 5,
          borderRadius: 3,
          p: 3,
        }}
      >
        <CardContent className="flex flex-col gap-4 text-center">
          <Typography variant="h5" fontWeight="bold" color="primary">
            Forgot Password
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your registered email address and we'll send you a reset link.
          </Typography>

          <form
            onSubmit={handleForgotPassword}
            className="flex flex-col gap-4 mt-2"
          >
            <TextField
              required
              type="email"
              label="Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
              sx={{ py: 1.2, fontWeight: "bold" }}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
