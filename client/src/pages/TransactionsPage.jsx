import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import AddTransactionModal from "../components/AddTransactionModal";

import api from "../services/api";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editTransaction, setEditTransaction] = useState(null);

  const [typeFilter, setTypeFilter] = useState("all");

  const [categoryFilter, setCategoryFilter] = useState("all");

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  const [categories, setCategories] = useState([]);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
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

  return (
    <MainLayout title="Transactions" subtitle="Manage your income and expenses">
      <div className="flex-1 overflow-auto p-6">
        <div className="flex justify-end">
          <button
            onClick={() => {
              setEditTransaction(null);

              setIsModalOpen(true);
            }}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition-all hover:bg-blue-700"
          >
            + Add Transaction
          </button>
        </div>

        <div className="mt-6 rounded-2xl bg-white p-5 shadow-md">
          <h3 className="mb-5 text-xl font-bold text-slate-800">
            Filter Transactions
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">
                Transaction Type
              </label>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="all">All Types</option>

                <option value="income">Income</option>

                <option value="expense">Expense</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">
                Category
              </label>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="all">All Categories</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">
                Start Date
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">
                End Date
              </label>

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-md">
          <h3 className="text-xl font-bold text-slate-800">All Transactions</h3>

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
                  filteredTransactions.map((item) => (
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

export default TransactionsPage;
