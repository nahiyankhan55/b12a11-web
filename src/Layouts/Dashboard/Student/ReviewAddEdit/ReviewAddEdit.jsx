import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import PropTypes from "prop-types";

const ReviewAddEdit = ({ review, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [comment, setComment] = useState(review.reviewComment);
  const [rating, setRating] = useState(review.ratingPoint);

  const handleUpdate = async () => {
    const res = await axiosSecure.put(`/reviews/${review._id}`, {
      reviewComment: comment,
      ratingPoint: rating,
    });

    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Updated!",
        timer: 1200,
        showConfirmButton: false,
      });

      queryClient.invalidateQueries(["myReviews", review.userEmail]);
      onClose();
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Review</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          <Rating value={rating} onChange={(e, v) => setRating(v)} />

          <TextField
            label="Review Comment"
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleUpdate}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ReviewAddEdit.propTypes = {
  review: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default ReviewAddEdit;
