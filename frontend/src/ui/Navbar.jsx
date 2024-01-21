import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="mx-auto flex items-center justify-between px-4 py-3">
      <div className="flex items-center">
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
