import { Container, Typography, Card, CardContent } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import DataLoader from "../../../../Components/DataLoader";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Analytics = () => {
  const AxiosPublic = useAxiosPublic();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["analyticsStats"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/analytics/stats");
      return res.data;
    },
    retry: 2,
  });

  if (isLoading) return <DataLoader></DataLoader>;
  if (isError)
    return (
      <div className="py-10 text-center font-medium text-orange-600">
        Failed to load analytics.
      </div>
    );

  // Prepare data for charts
  const barData = Object.entries(data.appCountPerUniversity || {}).map(
    ([univ, count]) => ({
      university: univ,
      applications: count,
    })
  );

  const pieData = [
    { name: "Users", value: data.usersCount },
    { name: "Scholarships", value: data.scholarshipsCount },
    { name: "Total Fees ($)", value: data.totalFees },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <Container className="py-8">
      <Typography variant="h5" className="mb-4 font-semibold">
        Admin Analytics
      </Typography>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent>
            <Typography variant="subtitle1">Total Users</Typography>
            <Typography variant="h6">{data.usersCount}</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="subtitle1">Total Scholarships</Typography>
            <Typography variant="h6">{data.scholarshipsCount}</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="subtitle1">
              Total Fees Collected ($)
            </Typography>
            <Typography variant="h6">{data.totalFees}</Typography>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Typography variant="h6" className="mb-2">
          Applications per University
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="university" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="applications" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <Typography variant="h6" className="mb-2">
          Summary Chart
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
};

export default Analytics;
