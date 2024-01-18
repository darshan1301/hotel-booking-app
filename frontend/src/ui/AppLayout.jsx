import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <div className="bg-stone-100">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
