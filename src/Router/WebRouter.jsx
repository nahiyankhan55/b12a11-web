import { Navigate, RouterProvider, createBrowserRouter } from "react-router";
import ErrorPage from "./ErrorPage";
import Main from "../Layouts/Main/Main";
import Home from "../Layouts/Main/Home/Home";
import AllScholarships from "../Layouts/Main/AllScholarships/AllScholarships";
import About from "../Layouts/Main/About/About";
import ScholarshipDetails from "../Layouts/Main/ScholarshipDetails/ScholarshipDetails";
import LoginPage from "../Layouts/Main/Auth/LoginPage";
import RegisterPage from "../Layouts/Main/Auth/RegisterPage";
import ForgotPasswordPage from "../Layouts/Main/Auth/ForgotPasswordPage";
import CheckoutPayment from "../Layouts/Main/Payment/CheckoutPayment";
import PaymentSuccess from "../Layouts/Main/Payment/PaymentSuccess";
import PaymentFailed from "../Layouts/Main/Payment/PaymentFailed";
import MyProfile from "../Layouts/Dashboard/MyProfile/MyProfile";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import DashboardHome from "../Layouts/Dashboard/DashboardHome/DashboardHome";
import AddScholarship from "../Layouts/Dashboard/Admin/AddScholarship/AddScholarship";
import ManageScholarships from "../Layouts/Dashboard/Admin/ManageScholarships/ManageScholarships";
import ManageUsers from "../Layouts/Dashboard/Admin/ManageUsers/ManageUsers";
import Analytics from "../Layouts/Dashboard/Admin/Analytics/Analytics";
import ManageAppliedApplications from "../Layouts/Dashboard/Moderator/ManageAppliedApplications/ManageAppliedApplications";
import AllReviews from "../Layouts/Dashboard/Moderator/AllReviews/AllReviews";
import MyApplications from "../Layouts/Dashboard/Student/MyApplications/MyApplications";
import MyReviews from "../Layouts/Dashboard/Student/MyReviews/MyReviews";
import EditApplication from "../Layouts/Dashboard/Student/EditApplication/EditApplication";
import App from "../App";
import UpdateScholarship from "../Layouts/Dashboard/Admin/UpdateScholarship/UpdateScholarship";

const WebRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: "/",
          element: <Main></Main>,
          children: [
            {
              path: "/",
              element: <Home></Home>,
            },
            {
              path: "/all-scholarships",
              element: <AllScholarships></AllScholarships>,
            },
            {
              path: "/about",
              element: <About></About>,
            },
            {
              path: "/scholarship-details/:id",
              element: <ScholarshipDetails></ScholarshipDetails>,
            },
            {
              path: "/login",
              element: <LoginPage></LoginPage>,
            },
            {
              path: "/register",
              element: <RegisterPage></RegisterPage>,
            },
            {
              path: "/forgot",
              element: <ForgotPasswordPage></ForgotPasswordPage>,
            },
            // payment routes
            {
              path: "/payment",
              element: <CheckoutPayment></CheckoutPayment>,
            },
            {
              path: "/payment-success",
              element: <PaymentSuccess></PaymentSuccess>,
            },
            {
              path: "/payment-failed",
              element: <PaymentFailed></PaymentFailed>,
            },
            // profile
            {
              path: "/profile",
              element: <MyProfile></MyProfile>,
            },
          ],
        },
        {
          path: "/dashboard",
          element: <Dashboard></Dashboard>,
          children: [
            {
              path: "/dashboard",
              element: <Navigate to={"/dashboard/home"}></Navigate>,
            },
            {
              path: "/dashboard/home",
              element: <DashboardHome></DashboardHome>,
            },
            // admin
            {
              path: "/dashboard/add",
              element: <AddScholarship></AddScholarship>,
            },
            {
              path: "/dashboard/manage-scholarships",
              element: <ManageScholarships></ManageScholarships>,
            },
            {
              path: "/dashboard/update-scholarship/:id",
              element: <UpdateScholarship></UpdateScholarship>,
            },
            {
              path: "/dashboard/manage-users",
              element: <ManageUsers></ManageUsers>,
            },
            {
              path: "/dashboard/analytics",
              element: <Analytics></Analytics>,
            },
            // moderator
            {
              path: "/dashboard/manage-applications",
              element: <ManageAppliedApplications></ManageAppliedApplications>,
            },
            {
              path: "/dashboard/all-reviews",
              element: <AllReviews></AllReviews>,
            },
            // student
            {
              path: "/dashboard/my-applications",
              element: <MyApplications></MyApplications>,
            },
            {
              path: "/dashboard/my-reviews",
              element: <MyReviews></MyReviews>,
            },
            {
              path: "/dashboard/edit-application/:id",
              element: <EditApplication></EditApplication>,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default WebRouter;
