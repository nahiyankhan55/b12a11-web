import { useState, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import WebContext from "../../../../Context/WebContext";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import DataLoader from "../../../../Components/DataLoader";
import Swal from "sweetalert2";

const MyApplications = () => {
  const { user } = useContext(WebContext);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState(null); // application object for details modal
  const [deletingId, setDeletingId] = useState(null); // id being deleted (for disabling)

  // review states
  const [reviewOpen, setReviewOpen] = useState(false);
  const [selectedForReview, setSelectedForReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // GET: user's applications (useQuery per requirement)
  const {
    data: applications = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["applications", user?.email],
    queryFn: async () => {
      // server expects ?email=<userEmail>
      const res = await axiosPublic.get("/applications/user", {
        params: { email: user?.email },
      });
      return res.data;
    },
    enabled: !!user?.email,
    retry: 1,
  });
  console.log(applications);

  // details modal
  const handleView = (app) => {
    setSelected(app);
  };
  const handleClose = () => setSelected(null);

  // go edit page
  const handleEdit = (app) => {
    // only editable when status is 'pending'
    if (app.status !== "pending") {
      toast.info("Only pending applications can be edited.");
      return;
    }
    navigate(`/dashboard/edit-application/${app._id}`, { state: { app } });
  };

  // payment failed
  const handlePay = (app) => {
    // only allow pay when pending + paymentStatus unpaid
    if (app.applicationStatus !== "pending" || app.payment === "Paid") {
      toast.info("Payment not required or already completed.");
      return;
    }
    // pass scholarship id or whole scholarship if you stored it
    navigate("/payment", {
      state: { scholarship: app.scholar || { _id: app.scholarshipId } },
    });
  };

  // delete application
  const handleDelete = async (app) => {
    if (app.status !== "pending") {
      toast.info("Only pending applications can be deleted.");
      return;
    }

    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This application will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      setDeletingId(app._id);

      const res = await axiosSecure.delete(`/applications/${app._id}`);

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your application has been deleted.",
          timer: 1500,
          showConfirmButton: false,
        });

        queryClient.invalidateQueries(["applications", user?.email]);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Could not delete application.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong while deleting.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  // review modal
  const openReviewModal = (app) => {
    setSelectedForReview(app);
    setReviewOpen(true);
  };
  const closeReviewModal = () => {
    setReviewOpen(false);
    setSelectedForReview(null);
    setRating(0);
    setComment("");
  };

  // post review
  const handleSubmitReview = async () => {
    if (!rating || !comment || !selectedForReview.scholar.postedUserEmail) {
      toast.error("Please give rating & comment.");
      return;
    }

    try {
      const reviewData = {
        scholarshipId: selectedForReview.scholarshipId,
        universityName: selectedForReview.universityName,
        scholarshipName: selectedForReview.scholarshipName,
        userName: user.displayName,
        userEmail: user.email,
        postByEmail: selectedForReview.scholar.postedUserEmail,
        userImage: user.photoURL,
        ratingPoint: rating,
        reviewComment: comment,
        reviewDate: new Date(),
      };

      const res = await axiosSecure.post("/reviews", reviewData);

      if (res.status === 200) {
        toast.success("Review added!");
        queryClient.invalidateQueries(["applications", user.email]);
        closeReviewModal();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review.");
    }
  };

  if (!user?.email) {
    return (
      <Container maxWidth="lg" className="py-10">
        <Typography className="text-center">
          Please login to see your applications.
        </Typography>
      </Container>
    );
  }

  if (isLoading) return <DataLoader />;

  if (isError)
    return (
      <Container maxWidth="lg" className="py-10">
        <Typography className="text-center text-red-600">
          Failed to load your applications.
        </Typography>
      </Container>
    );

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography className="font-semibold md:text-3xl! sm:text-2xl! text-xl! mb-5!">
        My Applications
      </Typography>

      {applications.length === 0 ? (
        <Box className="py-10 text-center">
          <Typography>No applications yet.</Typography>
        </Box>
      ) : (
        <Grid
          className="grid! lg:grid-cols-3! md:grid-cols-2! grid-cols-1! gap-5"
          container
          spacing={3}
        >
          {applications.map((app) => (
            <Grid item xs={12} md={6} lg={4} key={app._id}>
              <Card className="h-full flex flex-col">
                {app.scholar?.universityImage ? (
                  <CardMedia
                    component="img"
                    className="max-h-40 h-full"
                    image={app.scholar.universityImage}
                    alt={app.scholar.universityName}
                  />
                ) : (
                  <Box className="h-40 bg-gray-100 flex items-center justify-center">
                    No Image
                  </Box>
                )}

                <CardContent className="flex-1">
                  <Typography variant="h6" gutterBottom>
                    {app.scholarshipName ||
                      app.scholar?.scholarshipName ||
                      "Untitled Scholarship"}
                  </Typography>

                  <Typography variant="body2" color="textSecondary">
                    {app.universityName || app.scholar?.universityName}
                  </Typography>

                  <Stack
                    direction="row"
                    className="mt-3 mb-2 flex items-center gap-2 flex-wrap"
                    flexWrap="wrap"
                  >
                    <Chip
                      label={app.degree || app.scholar?.degree || "Degree"}
                      size="small"
                    />
                    <Chip
                      label={
                        app.scholarshipCategory ||
                        app.scholar?.scholarshipCategory ||
                        "Category"
                      }
                      size="small"
                    />
                    <Chip
                      label={`Status: ${app.status || "pending"}`}
                      size="small"
                      color={
                        app.status === "completed"
                          ? "success"
                          : app.status === "processing"
                          ? "warning"
                          : "default"
                      }
                    />
                    <Chip
                      label={`Payment: ${app.payment || "unpaid"}`}
                      size="small"
                    />
                  </Stack>

                  <Typography variant="body2" className="mt-3">
                    Applied:{" "}
                    {new Date(
                      app.appliedDate ||
                        app.applicationDate ||
                        app.createdAt ||
                        Date.now()
                    ).toLocaleDateString()}
                  </Typography>
                </CardContent>

                <Divider />

                <Stack direction="row" className="p-3 flex flex-wrap gap-1">
                  {/* Details Button */}
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleView(app)}
                  >
                    Details
                  </Button>

                  {/* If application is completed → show Add Review */}
                  {app.status === "completed" ? (
                    <Button
                      size="small"
                      color="success"
                      variant="contained"
                      onClick={() => openReviewModal(app)}
                    >
                      Add Review
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleEdit(app)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="small"
                        color="primary"
                        disabled={app.payment === "Paid"}
                        variant="contained"
                        onClick={() => handlePay(app)}
                      >
                        Pay
                      </Button>

                      <Button
                        size="small"
                        color="error"
                        variant="contained"
                        onClick={() => handleDelete(app)}
                        disabled={deletingId === app._id}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Details dialog */}
      <Dialog
        open={Boolean(selected)}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Application Details</DialogTitle>
        <DialogContent dividers>
          {selected && (
            <>
              <Typography variant="h6">
                {selected.scholarshipName ||
                  selected.scholarship?.scholarshipName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {selected.universityName ||
                  selected.scholarship?.universityName}
              </Typography>

              <Stack
                direction="row"
                className="mt-2 flex items-center gap-2 flex-wrap mb-2"
              >
                <Chip
                  label={`Degree: ${
                    selected.degree || selected.scholarship?.degree || "-"
                  }`}
                />
                <Chip
                  label={`Category: ${
                    selected.scholarshipCategory ||
                    selected.scholarship?.scholarshipCategory ||
                    "-"
                  }`}
                />
                <Chip label={`Payment: ${selected.paymentStatus || "-"}`} />
                <Chip label={`Status: ${selected.applicationStatus || "-"}`} />
              </Stack>

              <Divider className="my-3" />

              <Typography variant="subtitle2">Applicant:</Typography>
              <Typography>
                {selected.userName} (
                {selected.applicant || selected.userEmail || user.email})
              </Typography>

              <Divider className="my-3" />

              <Typography variant="subtitle2">Moderator Feedback:</Typography>
              <Typography>{selected.feedback || "No feedback yet."}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={() => {
              if (selected) handleEdit(selected);
              handleClose();
            }}
            variant="contained"
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Review dialog */}
      <Dialog
        open={reviewOpen}
        onClose={closeReviewModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Your Review</DialogTitle>
        <DialogContent dividers>
          {selectedForReview && (
            <>
              <Stack direction="row" spacing={2} alignItems="center">
                <img
                  src={user.photoURL}
                  alt="user"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <Box>
                  <Typography>{user.displayName}</Typography>
                  <Typography variant="body2" color="gray">
                    {user.email}
                  </Typography>
                </Box>
              </Stack>

              <Divider className="my-4" />

              <Typography className="mb-2">Rating (1–5):</Typography>
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="border p-2 rounded w-full"
              />

              <Typography className="mt-4 mb-2">Your Comment:</Typography>
              <textarea
                rows="4"
                className="border p-2 rounded w-full"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={closeReviewModal}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitReview}>
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyApplications;
