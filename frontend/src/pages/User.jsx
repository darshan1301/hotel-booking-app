import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { getUserInfo } from "../services/user.services";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { usePopupMessage } from "../contexts/PopupMessageContext";

const User = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const { clearToken } = useAuth();
  const [userData, setUserData] = useState(() => (!user ? {} : user));
  const { displayPopupMessage } = usePopupMessage();

  // console.log("user", user, "token", jwtToken);

  if (!user)
    return (
      <>
        <p className="flex justify-center">Please login first!</p>
        <p className="flex justify-center">
          <Link className="text-blue-500 hover:text-blue-700" to="/signup">
            Signup
          </Link>
        </p>
        <p className="flex justify-center">
          <Link className="text-blue-500 hover:text-blue-700" to="/login">
            login
          </Link>
        </p>
      </>
    );

  const handleLogout = () => {
    clearToken();
    setUserData({});
    displayPopupMessage("Logged Out!", "red");
    navigate("/login");
  };

  // console.log(user);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-semibold">My Profile</h1>
        <div className="mb-4 flex items-center space-x-4">
          <div className="h-12 w-12 overflow-hidden rounded-full">
            {/* You can add a user avatar here */}
            <img
              src="https://res.cloudinary.com/hotel-booking-1301/image/upload/v1706812724/hotelImages/ncu5vk4lcqfuqhou8mah.jpg"
              alt="User Avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{`${userData.firstName} ${userData.lastName}`}</h2>
            <p className="text-gray-500">{userData.email}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Welcome, {userData.firstName}! Explore and manage your account.
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            type="button"
            to="/logout"
            className="cursor-pointer text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;

export async function loader() {
  const jwtToken = localStorage.getItem("jwtToken");
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };
  const data = await getUserInfo(headers);
  return data;
}
