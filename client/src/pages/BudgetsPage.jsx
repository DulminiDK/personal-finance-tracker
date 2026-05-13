import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import AddBudgetModal from "../components/AddBudgetModal";

import api from "../services/api";

const BudgetsPage = () => {
  const [budgets, setBudgets] = useState([]);

  const [transactions, setTransactions] = useState([]);

  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [editBudget, setEditBudget] = useState(null);

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

  useEffect(() => {
    fetchBudgets();
    fetchTransactions();
  }, []);

  const calculateSpentAmount = (category, month, year) => {
    return transactions
      .filter((transaction) => {
        const date = new Date(transaction.transaction_date);

        const transactionMonth = date.toLocaleString("default", {
          month: "long",
        });

        const transactionYear = date.getFullYear();

        return (
          transaction.type === "expense" &&
          transaction.category === category &&
          transactionMonth === month &&
          transactionYear === year
        );
      })
      .reduce((acc, item) => acc + Number(item.amount), 0);
  };

  return (
    <MainLayout title="Budgets" subtitle="Manage your monthly spending limits">
      <div className="flex justify-end">
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              setEditBudget(null);

              setIsBudgetModalOpen(true);
            }}
            className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition-all hover:bg-emerald-700"
          >
            + Create Budget
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {budgets.map((budget) => {
          const spent = calculateSpentAmount(
            budget.category,
            budget.month,
            budget.year,
          );

          const percentage = (spent / budget.amount) * 100;

          const exceeded = spent > budget.amount;

          return (
            <div key={budget.id} className="rounded-2xl bg-white p-6 shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {budget.category}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {budget.month} {budget.year}
                  </p>
                </div>

                <div
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    exceeded
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {exceeded ? "Over Budget" : "On Track"}
                </div>
              </div>

              <button
                onClick={() => {
                  setEditBudget(budget);

                  setIsBudgetModalOpen(true);
                }}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
              >
                Edit Budget
              </button>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-500">Spent</span>

                  <span className="font-semibold text-slate-700">
                    ${spent.toFixed(2)} / ${Number(budget.amount).toFixed(2)}
                  </span>
                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full ${
                      exceeded ? "bg-red-500" : "bg-emerald-500"
                    }`}
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                    }}
                  />
                </div>

                <p className="mt-3 text-sm text-slate-500">
                  {percentage.toFixed(0)}% used
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {budgets.length === 0 && (
        <div className="mt-10 rounded-2xl bg-white p-10 text-center text-slate-500 shadow-md">
          No budgets created yet
        </div>
      )}

      <AddBudgetModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
        fetchBudgets={fetchBudgets}
        editBudget={editBudget}
      />
    </MainLayout>
  );
};

export default BudgetsPage;
