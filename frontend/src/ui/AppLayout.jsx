import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
const AppLayout = () => {
  return (
    <div className="">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
