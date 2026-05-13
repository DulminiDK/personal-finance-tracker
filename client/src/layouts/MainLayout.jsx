import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const MainLayout = ({ children, title, subtitle }) => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 overflow-auto p-6">
        <Navbar title={title} subtitle={subtitle} />

        {children}
      </div>
    </div>
  );
};

export default MainLayout;
