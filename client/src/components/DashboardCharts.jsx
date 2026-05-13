import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#ca8a04",
  "#9333ea",
  "#0891b2",
];

const DashboardCharts = ({ transactions }) => {
  const expenseData = transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => {
      const existing = acc.find((x) => x.name === item.category);

      if (existing) {
        existing.value += Number(item.amount);
      } else {
        acc.push({
          name: item.category,
          value: Number(item.amount),
        });
      }

      return acc;
    }, []);

  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const expense = transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const summaryData = [
    {
      name: "Income",
      amount: income,
    },
    {
      name: "Expense",
      amount: expense,
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-xl font-bold text-slate-800">
          Expense Distribution
        </h3>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
              >
                {expenseData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-xl font-bold text-slate-800">
          Income vs Expenses
        </h3>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={summaryData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="amount" fill="#2563eb" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
