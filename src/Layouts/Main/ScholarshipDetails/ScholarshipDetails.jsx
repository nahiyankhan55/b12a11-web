import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Divider,
  Avatar,
  Box,
  Chip,
  Stack,
  Rating,
} from "@mui/material";
import { toast } from "react-toastify";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import DataLoader from "../../../Components/DataLoader";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // fetch scholarship details
  const {
    data: scholarship = null,
    isLoading: loadingScholarship,
    isError: scholarshipError,
  } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/scholarship/data/${id}`);
      return res.data;
    },
    enabled: !!id,
    retry: 1,
  });

  // fetch reviews
  const { data: reviews = [], isLoading: loadingReviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews", {
        params: { scholarshipId: id },
      });
      return res.data || [];
    },
    enabled: !!id,
    retry: 1,
  });

  // fetch similar scholarships
  const { data: recommendations = [], isLoading: loadingRecs } = useQuery({
    queryKey: scholarship
      ? ["recs", scholarship.subjectCategory || scholarship.scholarshipCategory]
      : ["recs", "empty"],
    queryFn: async () => {
      if (!scholarship) return [];
      const cat =
        scholarship.subjectCategory || scholarship.scholarshipCategory || "";
      const res = await axiosPublic.get("/scholarships", {
        params: { category: cat },
      });
      return (res.data || []).filter((s) => s._id !== id).slice(0, 4);
    },
    retry: 1,
  });

  if (loadingScholarship) return <DataLoader />;

  if (scholarshipError) {
    toast.error("Failed to load scholarship details");
    return (
      <p className="py-8 text-center text-red-600">
        Failed to load scholarship.
      </p>
    );
  }

  if (!scholarship) {
    return (
      <p className="py-8 text-center text-gray-600">Scholarship not found.</p>
    );
  }

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : "N/A");
  const amount = (v) => (!v ? "Free / N/A" : `${v} ৳`);
  const handleApply = () => navigate("/payment", { state: { scholarship } });
  const avgRating = reviews.length
    ? Math.round(
        (reviews.reduce((sum, r) => sum + (r.ratingPoint || 0), 0) /
          reviews.length) *
          10
      ) / 10
    : 0;

  return (
    <Container maxWidth="lg" className="py-8">
      <Grid container spacing={4}>
        {/* LEFT CONTENT */}
        <Grid item xs={12} md={8}>
          <Card className="shadow-sm">
            <CardMedia
              component="img"
              height="360"
              image={
                scholarship.universityImage || "/placeholder-university.jpg"
              }
              alt={scholarship.universityName}
            />
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
              >
                <Box>
                  <Typography variant="h5" className="font-semibold">
                    {scholarship.scholarshipName}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {scholarship.universityName} •{" "}
                    {scholarship.universityCountry}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography variant="body2" color="textSecondary">
                    World Rank
                  </Typography>
                  <Chip
                    label={scholarship.universityWorldRank || "—"}
                    color="primary"
                  />
                </Box>
              </Stack>

              <Divider className="my-4" />

              <Stack
                direction="row"
                flexWrap="wrap"
                className="mb-3 mt-3 flex items-center gap-3"
              >
                <Chip label={scholarship.degree || "Degree"} />
                <Chip label={scholarship.scholarshipCategory || "Category"} />
                <Chip
                  label={`Subject: ${scholarship.subjectCategory || "General"}`}
                />
                <Chip
                  label={`Posted: ${formatDate(
                    scholarship.scholarshipPostDate
                  )}`}
                />
                <Chip
                  label={`Deadline: ${formatDate(
                    scholarship.applicationDeadline
                  )}`}
                  color="warning"
                />
              </Stack>

              <Grid container spacing={2} className="mb-4">
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Application Fees</Typography>
                  <Typography>{amount(scholarship.applicationFees)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Service Charge</Typography>
                  <Typography>{amount(scholarship.serviceCharge)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Tuition Fees</Typography>
                  <Typography>
                    {scholarship.tuitionFees
                      ? `${scholarship.tuitionFees} ৳`
                      : "N/A"}
                  </Typography>
                </Grid>
              </Grid>

              <Divider className="my-4" />

              <Stack
                direction="row"
                spacing={2}
                alignItems="flex-end"
                className="flex items-center gap-3 flex-wrap"
              >
                <Button variant="contained" onClick={handleApply}>
                  Apply for Scholarship
                </Button>
                <Box
                  marginLeft="auto"
                  textAlign="right"
                  className="flex flex-col sm:items-start items-center"
                >
                  <Typography variant="body2" color="textSecondary">
                    Average Rating
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Rating value={avgRating} precision={0.5} readOnly />
                    <Typography variant="body2">({reviews.length})</Typography>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* REVIEWS */}
          <Box className="mt-6">
            <Typography variant="h6" className="mb-2">
              Student Reviews
            </Typography>
            {loadingReviews ? (
              <DataLoader />
            ) : reviews.length === 0 ? (
              <Typography color="textSecondary">No reviews yet.</Typography>
            ) : (
              <Stack spacing={2}>
                {reviews.map((r) => (
                  <Box key={r._id} className="p-3 border rounded-md">
                    <Stack direction="row" spacing={2}>
                      <Avatar
                        src={r.userImage || ""}
                        alt={r.userName || r.userEmail || "User"}
                      />
                      <Box>
                        <Typography>{r.userName || r.userEmail}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {new Date(r.reviewDate).toLocaleDateString()}
                        </Typography>
                        <Stack direction="row" spacing={1} className="mt-1">
                          <Rating
                            value={r.ratingPoint || 0}
                            precision={0.5}
                            readOnly
                            size="small"
                          />
                          <Typography variant="body2" color="textSecondary">
                            ({r.ratingPoint || 0})
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                    <Typography variant="body2" className="mt-2">
                      {r.reviewComment}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>
        </Grid>

        {/* SIDEBAR */}
        <Grid item xs={12} md={4}>
          <Card className="p-4 sticky top-20">
            <Typography variant="h6" className="mb-2">
              Quick Info
            </Typography>
            <Stack spacing={1} className="mb-3">
              <Typography>
                <strong>Country:</strong> {scholarship.universityCountry}
              </Typography>
              <Typography>
                <strong>City:</strong> {scholarship.universityCity}
              </Typography>
              <Typography>
                <strong>Degree:</strong> {scholarship.degree}
              </Typography>
              <Typography>
                <strong>Category:</strong> {scholarship.scholarshipCategory}
              </Typography>
              <Typography>
                <strong>Posted by:</strong> {scholarship.postedUserEmail}
              </Typography>
            </Stack>

            <Divider className="my-3" />

            <Typography variant="subtitle1" className="mb-2">
              You may also like
            </Typography>
            {loadingRecs ? (
              <DataLoader />
            ) : recommendations.length === 0 ? (
              <Typography color="textSecondary">No recommendations.</Typography>
            ) : (
              <Stack spacing={2}>
                {recommendations.map((rec) => (
                  <Box key={rec._id} className="flex gap-3 items-center">
                    <img
                      src={rec.universityImage}
                      alt={rec.universityName}
                      className="h-12 w-12 rounded object-cover"
                    />
                    <Box>
                      <Typography className="font-medium">
                        {rec.scholarshipName}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {rec.universityName}
                      </Typography>
                      <a
                        href={`/scholarship/${rec._id}`}
                        className="text-xs text-[#1976d2] hover:underline mt-1 block"
                      >
                        View
                      </a>
                    </Box>
                  </Box>
                ))}
              </Stack>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ScholarshipDetails;
