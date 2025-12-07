import { useContext, useState } from "react";
import WebContext from "../Context/WebContext";
import { ClickAwayListener } from "@mui/material";
import { Link, NavLink } from "react-router";
import { FiSun, FiMoon } from "react-icons/fi";
import mainLogo from "/scholar.png";
import { RiLoginBoxFill, RiLoginBoxLine, RiMenu2Fill } from "react-icons/ri";

const MainNav = () => {
  // nav func
  const [navShow, setShowNav] = useState(false);
  const navShowHide = () => setShowNav((prev) => !prev);
  // context
  const { user, userImage, handleLogout, theme, toggleTheme } =
    useContext(WebContext);
  // profile func
  const [showProfile, setShowProfile] = useState(false);
  const profileShowHide = () => setShowProfile((prev) => !prev);

  return (
    // event listener
    <ClickAwayListener
      onClickAway={() => {
        setShowNav(false);
        setShowProfile(false);
      }}
    >
      <div
        className={`${
          theme === "dark" ? "bg-gray-500/90 text-white" : "bg-white/90"
        } w-full fixed z-50 max-w-[1440px]`}
      >
        <div className="text-black flex justify-between items-center py-2 md:px-6 sm:px-3 px-2 mx-auto shadow-md">
          <div className="relative text-xl flex gap-3 font-bold items-center">
            <div className="flex">
              <button className="lg:hidden text-2xl" onClick={navShowHide}>
                <RiMenu2Fill></RiMenu2Fill>
              </button>
              {navShow && (
                <div className="absolute lg:hidden border-2 text-base rounded-lg top-14 font-bold bg-gray-100 text-gray-700 p-4">
                  <ul className="flex flex-col gap-3 text-nowrap">
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "border-purple-600 text-purple-700 border-b-2 py-1 px-4 rounded-lg text-center"
                          : "border-b-2 border-transparent py-2 px-4 rounded-lg text-center"
                      }
                      to="/"
                    >
                      Home
                    </NavLink>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "border-purple-600 text-purple-700 border-b-2 py-1 px-4 rounded-lg text-center"
                          : "border-b-2 border-transparent py-2 px-4 rounded-lg text-center"
                      }
                      to="/all-scholarships"
                    >
                      Scholarships
                    </NavLink>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "border-purple-600 text-purple-700 border-b-2 py-1 px-4 rounded-lg text-center"
                          : "border-b-2 border-transparent py-2 px-4 rounded-lg text-center"
                      }
                      to="/about"
                    >
                      About Us
                    </NavLink>
                    {user && (
                      <>
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "border-purple-600 text-purple-700 border-b-2 py-1 px-4 rounded-lg text-center"
                              : "border-b-2 border-transparent py-2 px-4 rounded-lg text-center"
                          }
                          to="/dashboard/home"
                        >
                          Dashboard
                        </NavLink>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "group flex items-center gap-1 text-purple-500 border-purple-700 border-b-2 border-l-2 rounded-tl-lg rounded-br-lg hover:scale-105 hover:border-cyan-700 duration-300 px-1 py-1 pr-2"
                  : "group flex items-center gap-1 border-b-2 border-l-2 border-black rounded-tl-lg rounded-br-lg hover:scale-105 hover:border-cyan-700 duration-300 px-1 py-1 pr-2"
              }
              to={"/"}
            >
              <img
                className="sm:w-10 w-8 rounded-tl-lg"
                src={mainLogo}
                alt="mainLogo"
              />
              <h1 className="md:text-xl text-lg font-bold sm:block hidden group-hover:text-cyan-700 duration-300">
                ScholarStream
              </h1>
            </NavLink>
            <div className="lg:flex gap-3 font-bold text-base hidden">
              <ul className="flex gap-3">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "py-1 shadow-lg px-4 rounded-lg border-b-2 border-purple-700 text-purple-500"
                      : "py-1 px-4 rounded-lg border-b-2 border-transparent hover:text-purple-700 duration-300"
                  }
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "py-1 shadow-lg px-4 rounded-lg border-b-2 border-purple-700 text-purple-500"
                      : "py-1 px-4 rounded-lg border-b-2 border-transparent hover:text-purple-700 duration-300"
                  }
                  to="/all-scholarships"
                >
                  Scholarships
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "py-1 shadow-lg px-4 rounded-lg border-b-2 border-purple-700 text-purple-500"
                      : "py-1 px-4 rounded-lg border-b-2 border-transparent hover:text-purple-700 duration-300"
                  }
                  to="/about"
                >
                  About Us
                </NavLink>
                {user && (
                  <>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "py-1 shadow-lg px-4 rounded-lg border-b-2 border-purple-700 text-purple-500"
                          : "py-1 px-4 rounded-lg border-b-2 border-transparent hover:text-purple-700 duration-300"
                      }
                      to="/dashboard/home"
                    >
                      Dashboard
                    </NavLink>
                  </>
                )}
              </ul>
            </div>
          </div>

          {user ? (
            <div className="relative flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition bg-white font-medium"
              >
                {theme === "light" ? (
                  <FiMoon className="text-xl text-yellow-500"></FiMoon>
                ) : (
                  <FiSun className="text-xl text-yellow-400"></FiSun>
                )}
              </button>
              <button onClick={profileShowHide}>
                <img
                  className="h-12 w-12 object-cover rounded-full border-2 border-purple-700 cursor-pointer hover:scale-105 duration-300 transition"
                  src={userImage}
                  alt="User-Photo"
                />
              </button>
              {showProfile && (
                <div
                  className={`absolute top-16 right-2 flex-col gap-2 py-5 px-3 bg-gray-50 rounded-lg shadow-md border ${
                    showProfile ? "flex" : "hidden"
                  }`}
                >
                  <h3 className="text-lg text-purple-700 font-bold">
                    {user.displayName}
                  </h3>
                  <p className="text-lg text-gray-600 font-medium">
                    {user.email}
                  </p>
                  <div>
                    <Link
                      className="text-xl font-semibold hover:text-gray-600 duration-300 hover:scale-105 transition"
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </div>
                  <div>
                    <Link
                      className="text-xl font-semibold text-orange-500 hover:text-orange-700 duration-300 hover:scale-105 transition"
                      to="/forgot"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div>
                    <button
                      onClick={handleLogout}
                      className="mt-3 text-xl text-left font-bold text-red-600 cursor-pointer hover:text-red-800 duration-300 transition hover:scale-105"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3 text-black">
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                {theme === "light" ? (
                  <FiMoon className="text-xl text-yellow-500"></FiMoon>
                ) : (
                  <FiSun className="text-xl text-yellow-400"></FiSun>
                )}
              </button>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "flex gap-2 items-center sm:px-5 p-1 bg-white rounded-full border border-purple-700 shadow-md shadow-purple-300 text-2xl"
                    : "flex gap-2 items-center sm:px-5 p-1 bg-white rounded-full border border-gray-700 text-2xl"
                }
              >
                <p className="text-lg font-medium sm:block hidden">Login</p>
                <RiLoginBoxLine></RiLoginBoxLine>
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "flex gap-2 items-center sm:px-5 p-1 bg-white rounded-full border border-purple-700 shadow-md shadow-purple-300 text-2xl"
                    : "flex gap-2 items-center sm:px-5 p-1 bg-white rounded-full border border-gray-700 text-2xl"
                }
              >
                <p className="text-lg font-medium sm:block hidden">Register</p>
                <RiLoginBoxFill></RiLoginBoxFill>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default MainNav;
