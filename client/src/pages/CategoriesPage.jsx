import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import CategoryModal from "../components/CategoryModal";

import api from "../services/api";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editCategory, setEditCategory] = useState(null);

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
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const incomeCategories = categories.filter((item) => item.type === "income");

  const expenseCategories = categories.filter(
    (item) => item.type === "expense",
  );

  const renderCategorySection = (title, data, color) => (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${color}`}
        >
          {data.length} Categories
        </span>
      </div>

      <div className="space-y-3">
        {data.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
          >
            <p className="font-medium text-slate-700">{category.name}</p>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditCategory(category);

                  setIsModalOpen(true);
                }}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(category.id)}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
            No categories found
          </div>
        )}
      </div>
    </div>
  );

  return (
    <MainLayout
      title="Categories"
      subtitle="Manage your income and expense categories"
    >  <div className="flex-1 overflow-auto p-6">
      <div className="flex justify-end">
        <button
          onClick={() => {
            setEditCategory(null);

            setIsModalOpen(true);
          }}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition-all hover:bg-blue-700"
        >
          + Add Category
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {renderCategorySection(
          "Income Categories",
          incomeCategories,
          "bg-green-100 text-green-600",
        )}

        {renderCategorySection(
          "Expense Categories",
          expenseCategories,
          "bg-red-100 text-red-600",
        )}
      </div>
</div>
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fetchCategories={fetchCategories}
        editCategory={editCategory}
      />
    </MainLayout>
  );
};

export default CategoriesPage;
