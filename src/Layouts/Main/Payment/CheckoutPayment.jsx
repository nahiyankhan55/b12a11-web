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
} from "@mui/material";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { toast } from "react-toastify";
import WebContext from "../../../Context/WebContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
// example: pk_test_123...

const CheckoutForm = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(WebContext);

  const location = useLocation();
  const scholarship = location.state?.scholarship;

  const [loading, setLoading] = useState(false);

  if (!scholarship) {
    return <p className="text-center py-10">Invalid payment request.</p>;
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

    // 1. Create PaymentIntent from server
    const { data } = await axiosPublic.post("/create-payment-intent", {
      amount: totalAmount,
      scholarshipId: scholarship._id,
    });

    const clientSecret = data.clientSecret;

    // 2. Confirm card payment
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
    <Card className="max-w-lg mx-auto mt-10 shadow-md">
      <CardContent>
        <Typography variant="h5" className="mb-4 font-semibold">
          Complete Payment
        </Typography>

        <Typography className="text-gray-600 mb-4">
          Scholarship: {scholarship.scholarshipName}
        </Typography>

        <Typography className="text-gray-700 font-medium mb-4">
          Total Amount: {totalAmount} ৳
        </Typography>

        <form onSubmit={handleSubmit}>
          <div className="border p-3 rounded mb-4">
            <CardElement />
          </div>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={!stripe || loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const CheckoutPayment = () => {
  return (
    <Container maxWidth="md" className="py-10">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Container>
  );
};

export default CheckoutPayment;
