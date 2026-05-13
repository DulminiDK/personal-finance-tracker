import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";
import AddTransactionModal from "../components/AddTransactionModal";
import DashboardCharts from "../components/DashboardCharts";
import MainLayout from "../layouts/MainLayout";

const incomeCategories = [
  "Salary",
  "Freelance",
  "Business",
  "Investment",
  "Bonus",
  "Gift Income",
  "Refund",
  "Rental Income",
];

const expenseCategories = [
  "Food",
  "Groceries",
  "Transport",
  "Clothes",
  "Electronics",
  "Bills",
  "Utilities",
  "Rent",
  "Health",
  "Beauty & Salon",
  "Education",
  "Travel",
  "Shopping",
  "Sports & Fitness",
  "Pets",
  "Subscriptions",
  "Insurance",
  "Repairs & Maintenance",
  "Mobile & Internet",
  "Miscellaneous",
];

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);
  const [budgets, setBudgets] = useState([]);

  const [budgetUsage, setBudgetUsage] = useState({
    totalBudget: 0,
    totalSpent: 0,
  });
  const [typeFilter, setTypeFilter] = useState("all");

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBudgets = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/budgets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBudgets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const totalExpenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const balance = totalIncome - totalExpenses;

  const totalBudget = budgets.reduce(
    (acc, item) => acc + Number(item.amount),
    0,
  );

 const totalSpent = budgets.reduce((acc, budget) => {
   const spentForBudget = transactions
     .filter((transaction) => {
       const date = new Date(transaction.transaction_date);

       const transactionMonth = date.toLocaleString("default", {
         month: "long",
       });

       const transactionYear = date.getFullYear();

       return (
         transaction.type === "expense" &&
         transaction.category === budget.category &&
         transactionMonth === budget.month &&
         transactionYear === budget.year
       );
     })
     .reduce((sum, item) => sum + Number(item.amount), 0);

   return acc + spentForBudget;
 }, 0);

  const filteredTransactions = transactions.filter((item) => {
    const matchesType = typeFilter === "all" || item.type === typeFilter;

    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    const transactionDate = new Date(item.transaction_date);

    const matchesStartDate =
      !startDate || transactionDate >= new Date(startDate);

    const matchesEndDate = !endDate || transactionDate <= new Date(endDate);
    return matchesType && matchesCategory && matchesStartDate && matchesEndDate;
  });

  const transactionCategories = transactions.map((item) => item.category);

  const categories = [
    ...new Set([
      ...incomeCategories,
      ...expenseCategories,
      ...transactionCategories,
    ]),
  ];

  return (
    <MainLayout title="Dashboard" subtitle="Track your financial activity">
      <div className="flex-1 overflow-auto p-6">
        <div className="mt-6 flex justify-end"></div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <p className="text-sm text-slate-500">Total Income</p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              ${totalIncome.toFixed(2)}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md">
            <p className="text-sm text-slate-500">Total Expenses</p>

            <h2 className="mt-2 text-3xl font-bold text-red-500">
              ${totalExpenses.toFixed(2)}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md">
            <p className="text-sm text-slate-500">Current Balance</p>

            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              ${balance.toFixed(2)}
            </h2>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <p className="text-sm text-slate-500">Budget Usage</p>

            <h2 className="mt-2 text-3xl font-bold text-emerald-600">
              ${totalSpent.toFixed(2)}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              of ${totalBudget.toFixed(2)} used
            </p>
          </div>
        </div>

        <DashboardCharts transactions={transactions} />

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-md">
          <h3 className="text-xl font-bold text-slate-800">
            Recent Transactions
          </h3>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-175">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="pb-3">Title</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  transactions.slice(0, 5).map((item) => (
                    <tr key={item.id} className="border-b border-slate-100">
                      <td className="py-4">{item.title}</td>

                      <td className="py-4">{item.category}</td>

                      <td
                        className={`py-4 font-semibold ${
                          item.type === "income"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {item.type === "income" ? "+" : "-"} ${item.amount}
                      </td>

                      <td className="py-4">
                        {item.transaction_date?.split("T")[0]}
                      </td>

                      <td className="py-4 text-center">
                        <button
                          onClick={() => {
                            setEditTransaction(item);
                            setIsModalOpen(true);
                          }}
                          className="mr-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-10 text-center text-slate-500"
                    >
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fetchTransactions={fetchTransactions}
        editTransaction={editTransaction}
      />
    </MainLayout>
  );
};

export default DashboardPage;
