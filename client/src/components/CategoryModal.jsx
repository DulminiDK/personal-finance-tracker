import { useEffect, useState } from "react";

import api from "../services/api";

const CategoryModal = ({ isOpen, onClose, fetchCategories, editCategory }) => {
  const initialState = {
    name: "",
    type: "expense",
  };

  const [formData, setFormData] = useState(initialState);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editCategory) {
      setFormData({
        name: editCategory.name || "",
        type: editCategory.type || "expense",
      });
    } else {
      setFormData(initialState);
    }
  }, [editCategory, isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (editCategory) {
        await api.put(
          `/categories/${editCategory.id}`,
          {
            name: formData.name,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } else {
        await api.post("/categories", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      fetchCategories();

      onClose();

      setFormData(initialState);
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">
            {editCategory ? "Edit Category" : "Add Category"}
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
              Category Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Category Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              disabled={editCategory}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 disabled:bg-slate-100"
            >
              <option value="expense">Expense</option>

              <option value="income">Income</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition-all hover:bg-blue-700 disabled:opacity-70"
          >
            {loading
              ? editCategory
                ? "Updating..."
                : "Creating..."
              : editCategory
                ? "Update Category"
                : "Create Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
