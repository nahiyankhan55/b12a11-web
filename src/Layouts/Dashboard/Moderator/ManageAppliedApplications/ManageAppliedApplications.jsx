import { useState, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import Swal from "sweetalert2";
import {
  Container,
  Typography,
  Button,
  Stack,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Divider,
} from "@mui/material";
import DataLoader from "../../../../Components/DataLoader";
import WebContext from "../../../../Context/WebContext";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import { HeadProvider, Title } from "react-head";

const columnHelper = createColumnHelper();

const ManageAppliedApplications = () => {
  const AxiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const { user } = useContext(WebContext); // optional: for moderator identity
  const [selected, setSelected] = useState(null); // details modal
  const [feedbackOpenFor, setFeedbackOpenFor] = useState(null); // application obj
  const [feedbackText, setFeedbackText] = useState("");

  const { data: userData } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    retry: 3,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user.email}`);
      return res.data;
    },
  });
  console.log(userData);

  // fetch all applications (moderator)
  const {
    data: applications = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["applications", "all"],
    queryFn: async () => {
      const res = await AxiosPublic.get(
        `/applications/${userData?.moderatorFor}`
      ); // ensure server has this
      return res.data;
    },
    retry: 3,
    enabled: !!userData?.moderatorFor,
  });

  console.log(applications);

  const handleOpenDetails = (app) => setSelected(app);
  const handleCloseDetails = () => setSelected(null);

  const handleOpenFeedback = (app) => {
    setFeedbackOpenFor(app);
    setFeedbackText(app.feedback || "");
  };
  const handleCloseFeedback = () => {
    setFeedbackOpenFor(null);
    setFeedbackText("");
  };

  const handleSendFeedback = async () => {
    if (!feedbackOpenFor) return;
    try {
      const id = feedbackOpenFor._id;
      const res = await AxiosPublic.put(`/applications/${id}/feedback`, {
        feedback: feedbackText,
      });
      if (res.status === 200) {
        toastSuccess("Feedback saved");
        handleCloseFeedback();
        queryClient.invalidateQueries(["applications", "all"]);
      } else {
        toastError("Failed to save feedback");
      }
    } catch (err) {
      console.error(err);
      toastError("Server error while saving feedback");
    }
  };

  const changeStatus = (app, newStatus) => {
    Swal.fire({
      title: `Change status to "${newStatus}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      try {
        const res = await AxiosPublic.put(`/applications/${app._id}/status`, {
          status: newStatus,
        });
        if (res.status === 200) {
          toastSuccess("Status updated");
          queryClient.invalidateQueries(["applications", "all"]);
        } else {
          toastError("Failed to update status");
        }
      } catch (err) {
        console.error(err);
        toastError("Server error while updating status");
      }
    });
  };

  const handleReject = (app) => {
    Swal.fire({
      title: "Reject application?",
      text: "This will mark the application as rejected (or delete).",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      try {
        const res = await AxiosPublic.delete(`/applications/delete/${app._id}`);
        if (res.status === 200) {
          toastSuccess("Application removed");
          queryClient.invalidateQueries(["applications", "all"]);
        } else {
          toastError("Failed to remove application");
        }
      } catch (err) {
        console.error(err);
        toastError("Server error while removing application");
      }
    });
  };

  // small toasts (simple)
  const toastSuccess = (msg) =>
    Swal.fire({
      icon: "success",
      title: msg,
      timer: 1200,
      showConfirmButton: false,
    });
  const toastError = (msg) =>
    Swal.fire({
      icon: "error",
      title: msg,
      timer: 1800,
      showConfirmButton: false,
    });

  const columns = [
    columnHelper.accessor((_, i) => i + 1, {
      id: "index",
      header: "#",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("applicant", {
      header: "Applicant",
      cell: (info) => (
        <div>
          <div className="font-medium">{info.getValue()}</div>
          <div className="text-xs text-gray-500">
            {info.row.original.userEmail}
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("universityName", {
      header: "University",
    }),
    columnHelper.accessor("scholarshipName", {
      header: "Scholarship",
      cell: (info) => (
        <div className="truncate max-w-xs" title={info.getValue()}>
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor("fees", {
      header: "Fees (৳)",
      cell: (info) => info.getValue() ?? "-",
    }),
    columnHelper.display({
      id: "status",
      header: "App. Status",
      cell: (info) => {
        const st = info.row.original.status || "pending";
        return (
          <Chip
            label={st}
            size="small"
            color={
              st === "completed"
                ? "success"
                : st === "processing"
                ? "warning"
                : "default"
            }
          />
        );
      },
    }),
    columnHelper.display({
      id: "payment",
      header: "Payment",
      cell: (info) => {
        const p =
          info.row.original.payment ||
          info.row.original.paymentStatus ||
          "unpaid";
        return <Chip label={p} size="small" />;
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => {
        const app = info.row.original;
        return (
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => handleOpenDetails(app)}
            >
              Details
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => handleOpenFeedback(app)}
            >
              Feedback
            </Button>
            <Button
              size="small"
              color="warning"
              variant="contained"
              onClick={() => changeStatus(app, "processing")}
            >
              Processing
            </Button>
            <Button
              size="small"
              color="success"
              variant="contained"
              onClick={() => changeStatus(app, "completed")}
            >
              Complete
            </Button>
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={() => handleReject(app)}
            >
              Reject
            </Button>
          </Stack>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: applications,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <DataLoader />;
  if (isError)
    return (
      <Container className="py-10">
        <Typography color="error">Failed to load applications.</Typography>
      </Container>
    );

  return (
    <Container maxWidth="lg" className="py-8">
      <HeadProvider>
        <Title>Manage Applications || ScholarStream</Title>
      </HeadProvider>
      <Typography variant="h5" className="mb-4 font-semibold">
        Manage Applied Applications
      </Typography>

      <div className="overflow-x-auto border rounded p-1 mb-4">
        <table className="table w-full">
          <thead className="bg-neutral/10">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th key={header.id} className="text-left p-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="align-top">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      {/* Details dialog */}
      <Dialog
        open={Boolean(selected)}
        onClose={handleCloseDetails}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Application Details</DialogTitle>
        <DialogContent dividers>
          {selected && (
            <>
              <Typography variant="h6">{selected.scholarshipName}</Typography>
              <Typography color="textSecondary">
                {selected.universityName}
              </Typography>

              <Divider className="my-3" />

              <Stack spacing={1}>
                <div>
                  <strong>Applicant:</strong> {selected.userName} (
                  {selected.applicant})
                </div>
                <div>
                  <strong>Fees:</strong> {selected.fees ?? "-"} ৳
                </div>
                <div>
                  <strong>Payment:</strong>{" "}
                  {selected.payment || selected.paymentStatus || "unpaid"}
                </div>
                <div>
                  <strong>Status:</strong>{" "}
                  {selected.applicationStatus || selected.status || "pending"}
                </div>
                <div>
                  <strong>Feedback:</strong>{" "}
                  {selected.feedback || "No feedback yet."}
                </div>
              </Stack>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Feedback dialog */}
      <Dialog
        open={Boolean(feedbackOpenFor)}
        onClose={handleCloseFeedback}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Send Feedback</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle2" className="mb-2">
            Scholarship: {feedbackOpenFor?.scholarshipName}
          </Typography>
          <TextField
            label="Feedback"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            multiline
            rows={5}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFeedback}>Cancel</Button>
          <Button variant="contained" onClick={handleSendFeedback}>
            Save Feedback
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageAppliedApplications;
