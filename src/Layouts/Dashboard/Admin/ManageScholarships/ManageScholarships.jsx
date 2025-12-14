import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import DataLoader from "../../../../Components/DataLoader";
import { Button } from "@mui/material";
import { useContext } from "react";
import WebContext from "../../../../Context/WebContext";
import { Link } from "react-router";
import { HeadProvider, Title } from "react-head";

const columnHelper = createColumnHelper();

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(WebContext);

  const {
    data: scholarships = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allScholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${user?.email}`);
      return res.data;
    },
    retry: 3,
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This scholarship will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/scholarships/delete/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Scholarship removed.", "success");
          refetch();
        }
      }
    });
  };

  const columns = [
    columnHelper.accessor((_, i) => i + 1, {
      id: "index",
      header: "#",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("universityImage", {
      header: "Image",
      cell: (info) => (
        <img
          src={info.getValue()}
          className="h-10 w-10 max-w-10 rounded object-cover"
        />
      ),
    }),
    columnHelper.accessor("scholarshipName", {
      header: "Scholarship",
      cell: (info) => (
        <span
          className="lg:max-w-28 truncate max-w-20 block"
          title={info.getValue()}
        >
          {info.getValue()}
        </span>
      ),
    }),

    columnHelper.accessor("universityName", {
      header: "University",
      cell: (info) => (
        <span
          className="lg:max-w-28 truncate max-w-20 block"
          title={info.getValue()}
        >
          {info.getValue()}
        </span>
      ),
    }),

    columnHelper.accessor("applicationFees", {
      header: "Fees",
      cell: (info) => `$${info.getValue()}`,
    }),

    columnHelper.accessor("scholarshipCategory", {
      header: "Category",
    }),

    columnHelper.accessor("universityCountry", {
      header: "Country",
    }),

    columnHelper.display({
      id: "update",
      header: "Update",
      cell: (info) => (
        <Link
          to={`/dashboard/update-scholarship/${info.row.original._id}`}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
        >
          Update
        </Link>
      ),
    }),
    columnHelper.display({
      id: "delete",
      header: "Delete",
      cell: (info) => (
        <button
          onClick={() => handleDelete(info.row.original._id)}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
        >
          Delete
        </button>
      ),
    }),
  ];

  // table instance
  const table = useReactTable({
    data: scholarships,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <DataLoader></DataLoader>;

  return (
    <div className="sm:p-4 p-1 space-y-4">
      <HeadProvider>
        <Title>Manage Scholarships || ScholarStream</Title>
      </HeadProvider>
      <h2 className="sm:text-2xl md:text-3xl text-xl font-semibold">
        Manage Scholarships
      </h2>

      <div className="overflow-x-auto border rounded p-1">
        <table className="table w-full md:text-base sm:text-sm text-xs">
          <thead className="bg-base-200">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="text-left p-2"
                  >
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

      <div className="flex justify-end gap-4">
        <Button
          variant="outlined"
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
    </div>
  );
};

export default ManageScholarships;
