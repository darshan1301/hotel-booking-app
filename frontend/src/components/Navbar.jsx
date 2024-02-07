/* eslint-disable react/prop-types */
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { usePopupMessage } from "../contexts/PopupMessageContext";

const Navbar = ({ toggleDropdown, isDropdownOpen, dropdownRef }) => {
  const navigate = useNavigate();
  const { jwtToken, clearToken } = useAuth();
  const { displayPopupMessage } = usePopupMessage();

  const handleLogout = () => {
    clearToken();
    toggleDropdown();
    displayPopupMessage("Looged out!");
    navigate("/");
  };

  return (
    <div className=" mx-auto flex items-center justify-between px-4 py-3 shadow md:px-10 lg:px-28">
      <div className="flex items-center" onClick={() => navigate("/")}>
        <img src="../../airbnb.png" alt="Logo" className="mr-2 h-8" />

        <span className="text-lg font-semibold text-red-500">nodenest</span>
      </div>
      <div ref={dropdownRef}>
        <nav className="text-semibold flex items-center space-x-4 text-sm">
          <div className="relative inline-block text-left">
            <button
              onClick={toggleDropdown}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <img
                className="h-6 w-6"
                src="/icons8-menu-50.png"
                alt="menu--v1"
              />
            </button>
            {jwtToken
              ? isDropdownOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <NavLink
                        onClick={toggleDropdown}
                        to="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Explore
                      </NavLink>
                      <NavLink
                        onClick={toggleDropdown}
                        to="/user"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </NavLink>
                      <NavLink
                        onClick={toggleDropdown}
                        to="/myHotels"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Hotels
                      </NavLink>
                      <NavLink
                        onClick={toggleDropdown}
                        to="/myBookings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Bookings
                      </NavLink>
                      <p
                        onClick={handleLogout}
                        type="button"
                        className="block cursor-pointer px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </p>
                    </div>
                  </div>
                )
              : isDropdownOpen && (
                  <LoggedOutNav toggleDropdown={toggleDropdown} />
                )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

function LoggedOutNav({ toggleDropdown }) {
  return (
    <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="py-1">
        <NavLink
          onClick={toggleDropdown}
          to="/"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Explore
        </NavLink>
        <NavLink
          onClick={toggleDropdown}
          to="/login"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Login
        </NavLink>
        <NavLink
          onClick={toggleDropdown}
          to="/signup"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Sign Up
        </NavLink>
      </div>
    </div>
  );
}
