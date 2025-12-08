import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import WebContext from "./WebContext";
import PropTypes from "prop-types";
import auth from "../Firebase/firebase.config";
import useAxiosPublic from "../Hook/useAxiosPublic";

const WebContextProvider = ({ children }) => {
  const AxiosPublic = useAxiosPublic();
  // User Info
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [loading, setLoading] = useState(true);

  // Handle Registration Email
  const handleRegisterEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // Handle Login Email
  const handleLoginEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Handle Google
  const handleGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Handle Logout
  const handleLogout = async () => {
    setLoading(true);
    return AxiosPublic.post("/logout")
      .then(() => {
        signOut(auth);
      })
      .then(() => {
        toast.warn(`Logout Successful`, {
          position: "top-center",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        toast.error(`${error.message}`, {
          position: "top-right",
          autoClose: 2000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  // User Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUserName(currentUser.displayName);
        setUserImage(currentUser.photoURL);
        // get token and store it via httpOnly cookie
        await AxiosPublic.post(
          "/jwt",
          { email: currentUser?.email },
          { withCredentials: true }
        );
      } else {
        setUser(null);
        setUserName("");
        setUserImage("");
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Theme Control
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved theme or default to light
    return localStorage.getItem("theme") || "light";
  });
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };
  useEffect(() => {
    document.body.className = theme === "dark" ? "dark" : "light";
  }, [theme]);

  const contextNames = {
    user,
    setUser,
    userName,
    setUserName,
    userImage,
    setUserImage,
    loading,
    setLoading,
    handleRegisterEmail,
    handleLoginEmail,
    handleLogout,
    handleGoogle,
    theme,
    toggleTheme,
  };

  return (
    <WebContext.Provider value={contextNames}>{children}</WebContext.Provider>
  );
};

export default WebContextProvider;

WebContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
