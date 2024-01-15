import { NavLink, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="text-lg text-green-400">
      <nav>
        <NavLink to="">Home</NavLink>
        <NavLink to="/myHotels">My Hotels</NavLink>
        <NavLink to="/myBookings">My Bookings</NavLink>
        <NavLink to="user">User</NavLink>
      </nav>
      {<Outlet />}
    </div>
  );
};

export default Navbar;
