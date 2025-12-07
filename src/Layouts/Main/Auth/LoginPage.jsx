import { useContext, useState } from "react";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import WebContext from "../../../Context/WebContext";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Divider, TextField, InputAdornment } from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import { HeadProvider, Title } from "react-head";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const AxiosPublic = useAxiosPublic();

  const { handleLoginEmail, handleGoogle, setUser, setUserName, setUserImage } =
    useContext(WebContext);

  // all users to check valid email
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/users");
      return res.data;
    },
  });

  // main login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const target = e.target;

    const email = target.email.value;
    const password = target.password.value;

    handleLoginEmail(email, password)
      .then((result) => {
        const loggedUser = result.user;

        setUser(loggedUser);
        setUserName(loggedUser.displayName);
        setUserImage(loggedUser.photoURL);

        toast.success("Login Successful", {
          position: "top-right",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        toast.error(`Login Error: ${error.message}`, {
          position: "top-right",
          autoClose: 2000,
        });
      });
  };

  // google function (same as register)
  const handleGoogleMethod = () => {
    handleGoogle()
      .then((result) => {
        const user = result.user;

        setUser(user);
        setUserName(user.displayName);
        setUserImage(user.photoURL);

        toast.success("Google Login Successful", {
          position: "top-right",
          autoClose: 2000,
        });

        const exists = users.find((u) => u.email === user.email);

        if (!exists) {
          const newUser = {
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
            role: "Student",
          };

          AxiosPublic.post("/users", newUser)
            .then((res) => console.log("new user added", res.data))
            .catch((err) => console.log(err));
        }
      })
      .catch((error) => {
        toast.error(`Google Login Error: ${error.message}`, {
          position: "top-right",
          autoClose: 2000,
        });
      });
  };

  return (
    <div className="w-full flex flex-col items-center sm:gap-5 gap-2 px-5 py-10">
      <HeadProvider>
        <Title>Login || ScholarStream</Title>
      </HeadProvider>
      <div className="flex flex-col gap-1 items-center text-center md:mt-8 mt-4">
        <h3 className="md:text-3xl text-2xl italic font-medium">Login</h3>
        <p className="text-base font-medium text-cyan-600">
          Access your account
        </p>
      </div>

      <Divider orientation="horizontal" variant="middle" flexItem></Divider>

      <div className="flex flex-col gap-4 max-w-lg mx-auto w-full">
        <form
          onSubmit={handleLoginSubmit}
          className="flex flex-col justify-center gap-4 mt-4 w-full"
        >
          <TextField
            name="email"
            className="w-full"
            type="email"
            label="Email"
            variant="outlined"
            required
            autoComplete="username"
          />

          <div className="w-full relative">
            <TextField
              name="password"
              className="w-full"
              type={showPassword ? "text" : "password"}
              label="Password"
              variant="outlined"
              required
              autoComplete="current-password"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                },
              }}
            />

            {!showPassword ? (
              <MdVisibility
                onClick={() => setShowPassword(true)}
                className="absolute top-4 right-3 text-2xl cursor-pointer"
              />
            ) : (
              <MdVisibilityOff
                onClick={() => setShowPassword(false)}
                className="absolute top-4 right-3 text-2xl cursor-pointer"
              />
            )}
          </div>

          <div className="w-full flex flex-col items-center">
            <button className="w-full mx-auto py-2 font-semibold rounded-lg border-2 text-white bg-linear-to-tr from-purple-500 to-teal-500 transition hover:shadow-lg">
              <p className="text-lg font-semibold py-1">Login</p>
            </button>
          </div>
        </form>

        <p className="text-xl font-bold text-center">or</p>

        <button
          onClick={handleGoogleMethod}
          className="w-full mx-auto border-2 border-cyan-500 bg-white rounded-lg text-xl font-semibold transition hover:shadow-lg hover:border-cyan-600 py-2 flex items-center justify-center gap-2 text-black"
        >
          <FcGoogle className="text-2xl" />
          Google
        </button>
        <p className="font-medium">
          New user?{" "}
          <Link
            className="font-semibold text-sky-700 hover:text-purple-600 duration-300"
            to={"/register"}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
