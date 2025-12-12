import { useContext, useState } from "react";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import WebContext from "../../../Context/WebContext";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Divider, TextField, InputAdornment, MenuItem } from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { HeadProvider, Title } from "react-head";
import { updateProfile } from "firebase/auth";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const AxiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    handleRegisterEmail,
    handleGoogle,
    setUser,
    setUserName,
    setUserImage,
  } = useContext(WebContext);

  // all users to prevent duplicate
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/users");
      return res.data;
    },
  });

  // main register
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const target = e.target;

    const name = target.name.value;
    const email = target.email.value;
    const password = target.password.value;
    const role = target.role.value || "Student"; // default student
    const image = target.image.value || ""; // new photo url field

    // email duplicate check
    const exists = users.find((u) => u.email === email);
    if (exists) {
      toast.error("User already exists with this email", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    handleRegisterEmail(email, password)
      .then((result) => {
        const newUser = result.user;
        updateProfile(newUser, {
          displayName: name,
          photoURL: image,
        });
        setUser(newUser);
        setUserName(name);
        setUserImage(image || newUser.photoURL || "");
        navigate("/");
        toast.success("Registration Successful", {
          position: "top-right",
          autoClose: 2000,
        });

        // insert new user into DB
        const toDB = {
          name,
          email,
          image: image || newUser.photoURL || "",
          role,
        };

        AxiosPublic.post("/users", toDB)
          .then((res) => console.log("user added", res.data))
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        toast.error(`Register Error: ${error.message}`, {
          position: "top-right",
          autoClose: 2000,
        });
      });
  };

  // google register
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
            .then((res) => console.log("added new student", res))
            .catch((err) => console.log(err));
        }
        navigate("/");
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
        <Title>Register || ScholarStream</Title>
      </HeadProvider>
      <div className="flex flex-col gap-1 items-center text-center md:mt-8 mt-4">
        <h3 className="md:text-3xl text-2xl italic font-medium">Register</h3>
        <p className="text-base font-medium text-cyan-600">
          Create your account
        </p>
      </div>

      <Divider orientation="horizontal" variant="middle" flexItem></Divider>

      <div className="flex flex-col gap-4 lg:w-3/5 md:w-8/12 sm:w-10/12 w-full">
        <form
          onSubmit={handleRegisterSubmit}
          className="flex flex-col justify-center gap-4 mt-4 w-full"
        >
          <div className="w-full flex md:flex-row flex-col gap-4">
            <TextField
              name="name"
              className="w-full"
              type="text"
              label="Full Name"
              variant="outlined"
              required
            />
            <TextField
              name="email"
              className="w-full"
              type="email"
              label="Email"
              variant="outlined"
              required
              autoComplete="username"
            />
          </div>

          <div className="w-full flex md:flex-row flex-col gap-4">
            {/* New PHOTO URL field */}
            <TextField
              name="image"
              className="w-full"
              type="text"
              label="Photo URL"
              variant="outlined"
              placeholder="https://i.ibb.co/xyz.jpg"
            />
            {/* ROLE SELECT */}
            <TextField
              name="role"
              className="w-full"
              select
              label="Select Role"
              defaultValue="Student"
              variant="outlined"
            >
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Moderator">Moderator</MenuItem>
            </TextField>
          </div>
          <div className="w-full relative">
            <TextField
              name="password"
              className="w-full"
              type={showPassword ? "text" : "password"}
              label="Password"
              variant="outlined"
              required
              autoComplete="new-password"
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
            <button className="w-full md:w-1/2 mx-auto py-2 font-semibold rounded-lg border-2 text-white bg-linear-to-tr from-green-500 to-blue-500 transition hover:shadow-lg">
              <p className="text-lg font-semibold py-1">Register</p>
            </button>
          </div>
        </form>

        <p className="text-xl font-bold text-center">or</p>

        <button
          onClick={handleGoogleMethod}
          className="w-full md:w-1/2 mx-auto border-2 border-cyan-500 bg-white rounded-lg text-xl font-semibold transition hover:shadow-lg hover:border-cyan-600 py-2 flex items-center justify-center gap-2 text-black"
        >
          <FcGoogle className="text-2xl" />
          Google
        </button>
        <p className="font-medium">
          Old user?{" "}
          <Link
            className="font-semibold text-purple-700 hover:text-sky-600 duration-300"
            to={"/login"}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
