import { useEffect, useState } from "react";
import api from "../services/api";

const AddBudgetModal = ({ isOpen, onClose, fetchBudgets, editBudget }) => {
  const initialState = {
    category: "",
    amount: "",
    month: "",
    year: new Date().getFullYear(),
  };

  const [formData, setFormData] = useState(initialState);

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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

      setCategories(response.data.filter((item) => item.type === "expense"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    if (editBudget) {
      setFormData({
        category: editBudget.category || "",
        amount: editBudget.amount || "",
        month: editBudget.month || "",
        year: editBudget.year || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [editBudget, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (editBudget) {
        await api.put(
          `/budgets/${editBudget.id}`,
          {
            amount: formData.amount,
            month: formData.month,
            year: formData.year,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } else {
        await api.post("/budgets", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      fetchBudgets();

      onClose();

      setFormData(initialState);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create budget");
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
            {editBudget ? "Update Budget" : "Create Budget"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-slate-400 hover:text-slate-600"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Category
            </label>

            <select
              disabled={editBudget}
              name="category"
              value={formData.category.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Budget Amount
            </label>

            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Month
            </label>

            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">Select Month</option>

              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition-all hover:bg-blue-700 disabled:opacity-70"
          >
            {loading
              ? editBudget
                ? "Updating..."
                : "Creating..."
              : editBudget
                ? "Update Budget"
                : "Create Budget"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBudgetModal;
