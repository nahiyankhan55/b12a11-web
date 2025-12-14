import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useContext, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  CardMedia,
} from "@mui/material";
import Swal from "sweetalert2";
import WebContext from "../../../../Context/WebContext";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import DataLoader from "../../../../Components/DataLoader";
import { HeadProvider, Title } from "react-head";

const columnHelper = createColumnHelper();

const AllReviews = () => {
  const AxiosPublic = useAxiosPublic();
  const { user } = useContext(WebContext);
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState(null);

  const { data: userData } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    retry: 3,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/users/${user?.email}`);
      return res.data;
    },
  });
  // Load all reviews posted under moderator
  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews", user?.email],
    enabled: !!userData?.moderatorFor,
    retry: 3,
    queryFn: async () => {
      const res = await AxiosPublic.get(
        `/reviews?modMail=${userData?.moderatorFor}`
      );
      return res.data;
    },
  });

  console.log(reviews);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete review?",
      text: "Are you sure? This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        const res = await AxiosPublic.delete(`/reviews/${id}`);
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Review deleted",
            timer: 1200,
            showConfirmButton: false,
          });
          queryClient.invalidateQueries(["reviews", user?.email]);
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to delete",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Server error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const columns = [
    columnHelper.accessor((_, i) => i + 1, {
      id: "index",
      header: "#",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("scholarshipName", {
      header: "Scholarship",
      cell: (info) => (
        <div className="truncate max-w-xs" title={info.getValue()}>
          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.accessor("universityName", {
      header: "University",
    }),

    columnHelper.accessor("reviewComment", {
      header: "Comment",
      cell: (info) => (
        <div className="truncate max-w-xs" title={info.getValue()}>
          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.accessor("ratingPoint", {
      header: "Rating",
      cell: (info) => (
        <Chip
          label={info.getValue()}
          color="warning"
          size="small"
          variant="filled"
        />
      ),
    }),

    columnHelper.accessor("reviewDate", {
      header: "Date",
      cell: (info) => {
        const val = info.getValue();
        let dateStr = "-";
        if (val) {
          const dateObj = new Date(val);
          if (!isNaN(dateObj)) dateStr = dateObj.toLocaleDateString();
        }
        return (
          <Chip label={dateStr} color="info" size="small" variant="filled" />
        );
      },
    }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => {
        const r = info.row.original;
        return (
          <div className="flex gap-2">
            <Button
              size="small"
              variant="outlined"
              onClick={() => setSelected(r)}
            >
              View
            </Button>

            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={() => handleDelete(r._id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: reviews,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) return <DataLoader />;
  if (isError)
    return (
      <Container className="py-10">
        <Typography color="error">Failed to load reviews.</Typography>
      </Container>
    );

  return (
    <Container maxWidth="lg" className="py-8">
      <HeadProvider>
        <Title>Manage Reviews || ScholarStream</Title>
      </HeadProvider>
      <Typography variant="h5" className="mb-4 font-semibold">
        All Reviews (Moderator)
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
              <tr key={row.id}>
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

      {/* Details modal */}
      <Dialog
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Review Details</DialogTitle>
        <DialogContent dividers>
          {selected && (
            <>
              <div className="flex items-start gap-3 flex-wrap">
                <img
                  src={selected.userImage}
                  alt={selected.userName}
                  className="w-14 h-14 rounded-full mb-3 object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{selected.userName}</h3>
                  <p className="font-medium text-gray-600">
                    {selected.userEmail}
                  </p>
                </div>
              </div>
              <Typography variant="h6">{selected.scholarshipName}</Typography>
              <Typography color="textSecondary">
                {selected.universityName}
              </Typography>

              <div className="mt-3">
                <strong>Rating:</strong> {selected.ratingPoint}
              </div>

              <div className="mt-2">
                <strong>Comment:</strong>
                <br />
                {selected.reviewComment}
              </div>

              <div className="mt-2">
                <strong>Date:</strong>{" "}
                {new Date(selected.reviewDate).toLocaleDateString()}
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelected(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AllReviews;
