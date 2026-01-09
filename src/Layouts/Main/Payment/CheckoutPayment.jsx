import { useLocation, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  Divider,
} from "@mui/material";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { toast } from "react-toastify";
import WebContext from "../../../Context/WebContext";
import { HeadProvider, Title } from "react-head";
import { Payment, Security } from "@mui/icons-material";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutForm = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const stripe = useStripe();
  const elements = useElements();
  const { user, theme } = useContext(WebContext);

  const location = useLocation();
  const scholarship = location.state?.scholarship;

  const [loading, setLoading] = useState(false);

  if (!scholarship) {
    return (
      <div className="text-center py-20 opacity-60 font-bold">
        Invalid payment request.
      </div>
    );
  }

  const totalAmount =
    (scholarship.applicationFees || 0) + (scholarship.serviceCharge || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      toast.error("Stripe not ready");
      setLoading(false);
      return;
    }

    const { data } = await axiosPublic.post("/create-payment-intent", {
      amount: totalAmount,
      scholarshipId: scholarship._id,
    });

    const clientSecret = data.clientSecret;
    const card = elements.getElement(CardElement);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || "Scholarship Applicant",
        },
      },
    });

    if (result.error) {
      toast.error(result.error.message || "Payment failed");
      setLoading(false);
      navigate("/payment-failed", { state: { scholarship } });
    } else {
      if (result.paymentIntent.status === "succeeded") {
        await axiosPublic.post("/payments", {
          scholarshipId: scholarship._id,
          amount: totalAmount,
          transactionId: result.paymentIntent.id,
          email: user?.email,
        });

        toast.success("Payment successful!");
        navigate("/payment-success", { state: { scholarship } });
      }
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* 3xl Title Rule */}
      <h1
        className={`md:text-3xl text-2xl font-bold mb-8 text-center ${
          theme === "dark" ? "text-white" : "text-purple-900"
        }`}
      >
        Secure <span className="text-sky-500">Checkout</span>
      </h1>

      <div
        className={`rounded-4xl border overflow-hidden transition-all duration-300 ${
          theme === "dark"
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-gray-100 shadow-xl"
        }`}
      >
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-500">
              <Payment />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold opacity-50">
                Scholarship Application
              </p>
              <h3 className="md:text-xl text-lg font-bold">
                {scholarship.scholarshipName}
              </h3>
            </div>
          </div>

          <Divider className="opacity-10 mb-6" />

          {/* Pricing Details - sm:text-lg Rule */}
          <div className="space-y-3 mb-8">
            <div className="flex justify-between items-center opacity-70">
              <span className="sm:text-lg text-sm">Application Fees</span>
              <span className="font-bold">
                ${scholarship.applicationFees || 0}
              </span>
            </div>
            <div className="flex justify-between items-center opacity-70">
              <span className="sm:text-lg text-sm">Service Charge</span>
              <span className="font-bold">
                ${scholarship.serviceCharge || 0}
              </span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-slate-800">
              <span className="sm:text-lg text-sm font-bold">Total Amount</span>
              <span className="text-2xl font-black text-sky-500">
                ${totalAmount}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              className={`p-4 rounded-2xl border transition-all ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: theme === "dark" ? "#fff" : "#424770",
                      "::placeholder": {
                        color: theme === "dark" ? "#94a3b8" : "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </div>

            <button
              disabled={!stripe || loading}
              className={`w-full py-4 bg-linear-to-r from-purple-600 to-sky-500 text-white font-bold rounded-2xl shadow-lg transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? "Processing..." : "Confirm & Pay Now"}
            </button>

            <div className="flex items-center justify-center gap-2 opacity-40 text-[10px] uppercase font-bold tracking-widest">
              <Security fontSize="small" />
              Secure SSL Encrypted Payment
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const CheckoutPayment = () => {
  const { theme } = useContext(WebContext);

  return (
    <div
      className={`w-full min-h-screen py-16 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-950 text-gray-300"
          : "bg-gray-50 text-gray-700"
      }`}
    >
      <HeadProvider>
        <Title>Checkout || ScholarStream</Title>
      </HeadProvider>
      <Container maxWidth="md">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Container>
    </div>
  );
};

export default CheckoutPayment;
