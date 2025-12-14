import { useLocation, useNavigate } from "react-router";
import { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import WebContext from "../../../Context/WebContext";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { HeadProvider, Title } from "react-head";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(WebContext);

  const scholarship = location.state?.scholarship;

  const hasCalled = useRef(false);

  useEffect(() => {
    if (hasCalled.current) return; // already called once
    hasCalled.current = true;

    if (!scholarship || !user?.email) return;

    const payload = {
      scholar: scholarship,
      scholarshipId: scholarship._id,
      scholarshipName: scholarship.scholarshipName,
      universityName: scholarship.universityName,
      fees: scholarship.applicationFees,
      applicant: user.email,
      userName: user.displayName,
      appliedDate: new Date(),
      status: "pending",
      payment: "Paid",
    };

    axiosPublic
      .post("/applications", payload)
      .then(() => {
        toast.success("Application submitted successfully!");
      })
      .catch(() => {
        toast.error("Failed to save application!");
      });
  }, [scholarship, user]);

  return (
    <div className="text-center py-20 flex flex-col items-center gap-3">
      <HeadProvider>
        <Title>Payment Successful || ScholarStream</Title>
      </HeadProvider>
      <h1 className="text-2xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>
      <p className="mt-2">Your application has been submitted.</p>

      <button
        onClick={() => navigate("/dashboard/my-applications")}
        className="btn mt-4 text-white bg-blue-600 py-2 px-4 rounded-md hover:bg-sky-800 duration-300"
      >
        Go to My Applications
      </button>
      <button
        onClick={() => navigate("/all-scholarships")}
        className="btn mt-4 text-white bg-green-600 py-2 px-4 rounded-md hover:bg-teal-800 duration-300"
      >
        Back to Scholarships
      </button>
    </div>
  );
};

export default PaymentSuccess;
