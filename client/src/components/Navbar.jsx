import { useNavigate } from "react-router-dom";

const Navbar = ({
  title = "Dashboard",
  subtitle = "Track your financial activity",
}) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();

    navigate("/");
  };

  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>

        <p className="text-sm text-slate-500">T{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-slate-700">{user?.name}</p>

          <p className="text-sm text-slate-500">{user?.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
