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
    <div className="w-full h-full bg-orange-200 sm:p-4 p-1 space-y-2">
      {renderLinks().map((item) => {
        if (item.role && item.role !== fixedRole) return null;

        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md font-medium ${
                isActive
                  ? "bg-orange-400 text-white"
                  : "text-black hover:bg-orange-300"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>

            {/* desktop text */}
            <span className="lg:flex hidden lg:text-sm xl:text-base">
              {item.label}
            </span>
          </NavLink>
        );
      })}
      <Link
        to={"/"}
        className="flex items-center gap-2 px-3 py-2 rounded-md font-medium text-black hover:bg-orange-300"
      >
        <FaHome className="text-xl" />
        <span className="lg:flex hidden lg:text-sm xl:text-base">
          Back Home
        </span>
      </Link>
    </div>
  );
};

export default SideNav;
