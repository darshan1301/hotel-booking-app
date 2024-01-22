import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-auto flex items-center justify-between px-4 py-3 shadow">
      <div className="flex items-center" onClick={() => navigate("/")}>
        <img src="../../airbnb.png" alt="Logo" className="mr-2 h-8" />

        <span className="text-lg font-semibold text-red-500">nodenest</span>
      </div>

      <div>
        <nav className="text-semibold flex items-center space-x-4 text-sm">
          <NavLink to="/myHotels">My Hotels</NavLink>
          <NavLink to="/myBookings">My Bookings</NavLink>
          <NavLink to="/user">User</NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
