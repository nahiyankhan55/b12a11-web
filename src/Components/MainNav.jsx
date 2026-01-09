import { useContext, useState } from "react";
import WebContext from "../Context/WebContext";
import { ClickAwayListener } from "@mui/material";
import { Link, NavLink } from "react-router";
import { FiSun, FiMoon } from "react-icons/fi";
import mainLogo from "/scholar.png";
import { RiLoginBoxFill, RiLoginBoxLine, RiMenu2Fill } from "react-icons/ri";

const MainNav = () => {
  const [navShow, setShowNav] = useState(false);
  const navShowHide = () => setShowNav((prev) => !prev);

  const { user, userName, userImage, handleLogout, theme, toggleTheme } =
    useContext(WebContext);

  const [showProfile, setShowProfile] = useState(false);
  const profileShowHide = () => setShowProfile((prev) => !prev);

  // Active Link Style based on your purple theme
  const activeStyle =
    "border-purple-600 text-purple-600 dark:text-purple-400 border-b-2 py-1 px-4 rounded-lg text-center font-bold";
  const normalStyle =
    "border-b-2 border-transparent py-2 px-4 rounded-lg text-center hover:text-purple-500 duration-300 dark:text-gray-300";

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-slate-900/95 text-white shadow-purple-900/20"
          : "bg-white/95 text-black"
      } w-full fixed top-0 z-50 shadow-md transition-colors duration-300 max-w-[1440px] mx-auto`}
    >
      {/* Global Max Width Applied Here */}
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center py-2 px-4">
        {/* Logo and Nav Links */}
        <div className="relative text-xl flex gap-6 font-bold items-center">
          <ClickAwayListener
            onClickAway={() => {
              setShowNav(false);
            }}
          >
            <div className="flex">
              <button
                className="lg:hidden text-2xl dark:text-white"
                onClick={navShowHide}
              >
                <RiMenu2Fill />
              </button>

              {/* Mobile Menu */}
              {navShow && (
                <div
                  className={`absolute lg:hidden border-2 text-base rounded-lg top-14 font-bold p-4 z-50 ${
                    theme === "dark"
                      ? "bg-slate-800 border-purple-900 text-white"
                      : "bg-gray-100 border-white text-gray-700"
                  }`}
                >
                  <ul className="flex flex-col gap-3 text-nowrap">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? activeStyle : normalStyle
                      }
                      to="/"
                    >
                      Home
                    </NavLink>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? activeStyle : normalStyle
                      }
                      to="/all-scholarships"
                    >
                      Scholarships
                    </NavLink>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? activeStyle : normalStyle
                      }
                      to="/about"
                    >
                      About Us
                    </NavLink>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? activeStyle : normalStyle
                      }
                      to="/career"
                    >
                      Career
                    </NavLink>
                    {user && (
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? activeStyle : normalStyle
                        }
                        to="/dashboard/home"
                      >
                        Dashboard
                      </NavLink>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </ClickAwayListener>
          {/* Logo Section */}
          <NavLink
            className={({ isActive }) =>
              `group flex items-center gap-1 border-b-2 border-l-2 rounded-tl-lg rounded-br-lg hover:scale-105 duration-300 px-1 py-1 pr-2 ${
                isActive
                  ? "border-purple-600 text-purple-600"
                  : "border-slate-800 dark:border-purple-400"
              }`
            }
            to={"/"}
          >
            <img
              className="sm:w-10 w-8 rounded-tl-lg"
              src={mainLogo}
              alt="mainLogo"
            />
            <h1
              className={`md:text-xl text-lg font-bold sm:block hidden group-hover:text-purple-500 duration-300 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              ScholarStream
            </h1>
          </NavLink>

          {/* Desktop Nav Items */}
          <div className="lg:flex gap-1 font-bold text-base hidden">
            <ul className="flex gap-1">
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeStyle : normalStyle
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeStyle : normalStyle
                }
                to="/all-scholarships"
              >
                Scholarships
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeStyle : normalStyle
                }
                to="/about"
              >
                About Us
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeStyle : normalStyle
                }
                to="/career"
              >
                Career
              </NavLink>
              {user && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeStyle : normalStyle
                  }
                  to="/dashboard/home"
                >
                  Dashboard
                </NavLink>
              )}
            </ul>
          </div>
        </div>

        {/* Right Side: Theme Toggle & Profile/Login */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`flex items-center justify-center w-10 h-10 rounded-full border transition duration-300 ${
              theme === "dark"
                ? "bg-slate-800 border-purple-500 text-yellow-400"
                : "bg-gray-100 border-gray-300 text-purple-600"
            }`}
          >
            {theme === "light" ? (
              <FiMoon className="text-xl" />
            ) : (
              <FiSun className="text-xl" />
            )}
          </button>

          {user ? (
            <ClickAwayListener
              onClickAway={() => {
                setShowProfile(false);
              }}
            >
              <div className="relative flex items-center gap-3">
                <button onClick={profileShowHide}>
                  <img
                    className="h-11 w-11 object-cover rounded-full border-2 border-purple-600 cursor-pointer hover:scale-110 transition duration-300"
                    src={userImage}
                    alt="User-Photo"
                  />
                </button>

                {/* Profile Dropdown */}
                {showProfile && (
                  <div
                    className={`absolute top-14 right-0 flex flex-col gap-2 py-5 px-5 rounded-lg shadow-xl border z-50 min-w-[200px] ${
                      theme === "dark"
                        ? "bg-slate-800 border-purple-900 text-white"
                        : "bg-white border-gray-100 text-slate-800"
                    }`}
                  >
                    <h3 className="text-md text-purple-500 font-bold">
                      {user.displayName || userName}
                    </h3>
                    <p className="text-sm opacity-80 mb-2">{user.email}</p>
                    <hr className="border-gray-600 mb-2" />
                    <Link
                      className="hover:text-purple-500 transition"
                      to="/profile"
                    >
                      Profile
                    </Link>
                    <Link
                      className="hover:text-purple-500 transition text-sm text-orange-400"
                      to="/forgot"
                    >
                      Forgot Password?
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="mt-2 text-left font-bold text-red-500 hover:text-red-700 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </ClickAwayListener>
          ) : (
            <div className="flex gap-2">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `flex gap-2 items-center sm:px-4 px-2 py-2 rounded-full border transition duration-300 ${
                    isActive
                      ? "bg-purple-600 text-white border-purple-600 shadow-lg"
                      : "border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-slate-800"
                  }`
                }
              >
                <span className="text-sm font-bold sm:block hidden">Login</span>
                <RiLoginBoxLine className="text-xl" />
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `flex gap-2 items-center sm:px-4 px-2 py-2 rounded-full border transition duration-300 ${
                    isActive
                      ? "bg-purple-600 text-white border-purple-600 shadow-lg"
                      : "border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-slate-800"
                  }`
                }
              >
                <span className="text-sm font-bold sm:block hidden">
                  Register
                </span>
                <RiLoginBoxFill className="text-xl" />
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainNav;
