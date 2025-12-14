import { useState, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import Swal from "sweetalert2";
import WebContext from "../../../../Context/WebContext";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import ReviewAddEdit from "../ReviewAddEdit/ReviewAddEdit";
import DataLoader from "../../../../Components/DataLoader";
import { HeadProvider, Title } from "react-head";

const MyReviews = () => {
  const { user } = useContext(WebContext);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [editing, setEditing] = useState(null); // selected review for editing

  // load reviews of logged-in user
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews", {
        params: { email: user?.email },
      });
      return res.data;
    },
    enabled: !!user?.email,
    retry: 1,
  });

  console.log(reviews);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Review?",
      text: "This review will be removed permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosSecure.delete(`/reviews/${id}`);
    if (res.status === 200) {
      Swal.fire("Deleted!", "Review removed.", "success");
      queryClient.invalidateQueries(["myReviews", user.email]);
    }
  };

  if (isLoading) return <DataLoader />;

  return (
    <Container maxWidth="lg" className="py-8">
      <HeadProvider>
        <Title>My Reviews || ScholarStream</Title>
      </HeadProvider>
      <Typography className="font-semibold md:text-3xl! text-xl! mb-5!">
        My Reviews
      </Typography>

      {reviews.length === 0 ? (
        <Typography>No reviews yet.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell>Scholarship Name</TableCell>
                <TableCell>University</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {reviews.map((rev) => (
                <TableRow key={rev._id}>
                  <TableCell>{rev.scholarshipName}</TableCell>
                  <TableCell>{rev.universityName}</TableCell>
                  <TableCell>{rev.reviewComment}</TableCell>
                  <TableCell>
                    {new Date(rev.reviewDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{rev.ratingPoint}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => setEditing(rev)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="small"
                        color="error"
                        variant="contained"
                        onClick={() => handleDelete(rev._id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {editing && (
        <ReviewAddEdit review={editing} onClose={() => setEditing(null)} />
      )}
    </Container>
  );
};

export default MyReviews;
