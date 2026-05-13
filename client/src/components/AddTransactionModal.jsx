import { useEffect, useState } from "react";

import api from "../services/api";

const AddTransactionModal = ({
  isOpen,
  onClose,
  fetchTransactions,
  editTransaction,
}) => {
  const initialState = {
    title: "",
    amount: "",
    category: "",
    type: "expense",
    transaction_date: "",
    note: "",
  };

  const [formData, setFormData] = useState(initialState);

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

  const filteredCategories = categories.filter(
    (item) => item.type === formData.type,
  );

  useEffect(() => {
    fetchCategories();
    if (editTransaction) {
      setFormData({
        title: editTransaction.title || "",
        amount: editTransaction.amount || "",
        category: editTransaction.category || "",
        type: editTransaction.type || "expense",
        transaction_date: editTransaction.transaction_date?.split("T")[0] || "",
        note: editTransaction.note || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [editTransaction, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (editTransaction) {
        await api.put(`/transactions/${editTransaction.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await api.post("/transactions", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      fetchTransactions();

      onClose();

      setFormData(initialState);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">
            {editTransaction ? "Edit Transaction" : "Add Transaction"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-slate-400 hover:text-slate-600"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Transaction title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500"
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Transaction Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="expense">Expense</option>

              <option value="income">Income</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Category
            </label>

            <input
              list="category-options"
              type="text"
              name="category"
              placeholder="Select or type category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500"
            />

            <datalist id="category-options">
              {filteredCategories.map((category) => (
                <option key={category} value={category.name} />
              ))}
            </datalist>
          </div>

          <input
            type="date"
            name="transaction_date"
            value={formData.transaction_date}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500"
          />

          <textarea
            name="note"
            placeholder="Note"
            value={formData.note}
            onChange={handleChange}
            rows="3"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition-all hover:bg-blue-700 disabled:opacity-70"
          >
            {loading
              ? editTransaction
                ? "Updating..."
                : "Adding..."
              : editTransaction
                ? "Update Transaction"
                : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
