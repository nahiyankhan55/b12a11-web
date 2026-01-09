import { Link, NavLink } from "react-router";
import {
  MdDashboard,
  MdAssignment,
  MdRateReview,
  MdAddBox,
  MdPeople,
  MdAnalytics,
  MdOutlineAppRegistration,
} from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { FaHome } from "react-icons/fa";

const SideNav = ({ role }) => {
  const fixedRole = role?.toLowerCase() || "";

  const commonLinks = [
    { to: "/dashboard/home", label: "Dashboard", icon: <MdDashboard /> },
    {
      to: "/dashboard/my-applications",
      label: "My Applications",
      icon: <MdAssignment />,
      role: "student",
    },
    {
      to: "/dashboard/my-reviews",
      label: "My Reviews",
      icon: <MdRateReview />,
      role: "student",
    },
  ];

  const adminLinks = [
    { to: "/dashboard/add", label: "Add Scholarship", icon: <MdAddBox /> },
    {
      to: "/dashboard/manage-scholarships",
      label: "Manage Scholarships",
      icon: <FiFileText />,
    },
    {
      to: "/dashboard/manage-users",
      label: "Manage Users",
      icon: <MdPeople />,
    },
    { to: "/dashboard/analytics", label: "Analytics", icon: <MdAnalytics /> },
  ];

  const moderatorLinks = [
    {
      to: "/dashboard/manage-applications",
      label: "Manage Applications",
      icon: <MdOutlineAppRegistration />,
    },
    {
      to: "/dashboard/all-reviews",
      label: "All Reviews",
      icon: <MdRateReview />,
    },
  ];

  const renderLinks = () => {
    if (fixedRole === "admin") return [...commonLinks, ...adminLinks];
    if (fixedRole === "moderator") return [...commonLinks, ...moderatorLinks];
    return commonLinks;
  };

  return (
    <div className="w-full h-full sm:p-4 p-2 space-y-2 flex flex-col border-r">
      {/* Sidebar Links */}
      <div className="flex-1 space-y-1">
        {renderLinks().map((item) => {
          if (item.role && item.role !== fixedRole) return null;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-2 py-2 lg:w-full w-fit rounded-xl font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
                    : "text-slate-500 hover:bg-sky-500/10 hover:text-sky-500"
                }`
              }
            >
              <span className="sm:text-2xl text-xl">{item.icon}</span>

              {/* desktop text */}
              <span className="lg:flex hidden text-sm xl:text-base tracking-tight">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-slate-200/50 my-4"></div>

      {/* Back Home Link */}
      <Link
        to={"/"}
        className="flex items-center gap-3 px-2 py-2 rounded-xl font-bold text-slate-500 hover:bg-indigo-500/10 hover:text-indigo-500 transition-all duration-300"
      >
        <FaHome className="text-2xl" />
        <span className="lg:flex hidden lg:text-sm xl:text-base tracking-tight">
          Back Home
        </span>
      </Link>
    </div>
  );
};

export default SideNav;
