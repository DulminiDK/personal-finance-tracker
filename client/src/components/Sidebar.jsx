import { FaChartPie, FaMoneyBillWave, FaWallet, FaTags } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-64 flex-col bg-slate-900 text-white">
      <div className="border-b border-slate-800 px-6 py-5">
        <h1 className="text-2xl font-bold">Finance Tracker</h1>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <button
          onClick={() => navigate("/dashboard")}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
            location.pathname === "/dashboard"
              ? "bg-slate-800 text-white"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <FaChartPie />
          Dashboard
        </button>

        <button
          onClick={() => navigate("/transactions")}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
            location.pathname === "/transactions"
              ? "bg-slate-800 text-white"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <FaMoneyBillWave />
          Transactions
        </button>

        <button
          onClick={() => navigate("/budgets")}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
            location.pathname === "/budgets"
              ? "bg-slate-800 text-white"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <FaWallet />
          Budgets
        </button>

        <button
          onClick={() => navigate("/categories")}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
            location.pathname === "/categories"
              ? "bg-slate-800 text-white"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <FaTags />
          Categories
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
