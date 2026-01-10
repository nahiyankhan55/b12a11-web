import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import { useState, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import PropTypes from "prop-types";
import WebContext from "../../../../Context/WebContext";
import { MdClose, MdRateReview, MdUpdate } from "react-icons/md";

const ReviewAddEdit = ({ review, onClose }) => {
  const { theme } = useContext(WebContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [comment, setComment] = useState(review.reviewComment);
  const [rating, setRating] = useState(review.ratingPoint);

  const handleUpdate = async () => {
    try {
      const res = await axiosSecure.put(`/reviews/${review._id}`, {
        reviewComment: comment,
        ratingPoint: Number(rating),
      });

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Review Updated!",
          background: theme === "dark" ? "#1e293b" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          timer: 1500,
          showConfirmButton: false,
        });

        queryClient.invalidateQueries(["myReviews", review.userEmail]);
        onClose();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "2rem",
          padding: 1,
          backgroundColor: theme === "dark" ? "#0f172a" : "#fff",
          backgroundImage: "none",
          color: theme === "dark" ? "#fff" : "#000",
        },
      }}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, display: "flex", alignItems: "center", gap: 1.5 }}
      >
        <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500">
          <MdRateReview size={24} />
        </div>
        <div className="flex-1">
          <p className="sm:text-xl text-lg font-black tracking-tight leading-none">
            Edit Your Review
          </p>
          <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest mt-1">
            {review.scholarshipName}
          </p>
        </div>
        <IconButton
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
            "&:hover": { color: "#ef4444" },
          }}
        >
          <MdClose />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        <Box className="flex flex-col gap-6 pt-2">
          {/* Rating Section */}
          <div>
            <p className="text-[10px] font-black uppercase opacity-40 mb-3 tracking-widest">
              Overall Rating
            </p>
            <Rating
              size="large"
              value={rating}
              onChange={(e, v) => setRating(v)}
              sx={{
                "& .MuiRating-iconFilled": { color: "#f59e0b" },
                "& .MuiRating-iconHover": { color: "#fbbf24" },
              }}
            />
          </div>

          {/* Comment Section */}
          <div>
            <p className="text-[10px] font-black uppercase opacity-40 mb-3 tracking-widest">
              Your Feedback
            </p>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Share your experience with this scholarship..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "1.5rem",
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(0,0,0,0.02)",
                  color: theme === "dark" ? "#fff" : "#000",
                  "& fieldset": { borderColor: "rgba(56, 189, 248, 0.1)" },
                  "&:hover fieldset": {
                    borderColor: "rgba(56, 189, 248, 0.3)",
                  },
                  "&.Mui-focused fieldset": { borderColor: "#0ea5e9" },
                },
              }}
            />
          </div>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <button
          onClick={onClose}
          className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
        >
          Discard
        </button>
        <button
          onClick={handleUpdate}
          className="flex-2 sm:py-4 py-2 px-2 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.15em] shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2"
        >
          <MdUpdate size={18} /> Update Review
        </button>
      </DialogActions>
    </Dialog>
  );
};

ReviewAddEdit.propTypes = {
  review: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReviewAddEdit;
