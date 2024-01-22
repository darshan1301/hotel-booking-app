import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyHotels from "./pages/MyHotels";
import MyBookings from "./pages/MyBookings";
import User from "./pages/User";
import Home from "./pages/Home";
import HotelDetails from "./pages/HotelDetails";
import EditHotel from "./pages/EditHotel";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/myHotels",
          element: <MyHotels />,
        },
        {
          path: "/myBookings",
          element: <MyBookings />,
        },
        {
          path: "/user",
          element: <User />,
        },
        {
          path: "/hotel/:hotelId",
          element: <HotelDetails />,
        },
        {
          path: "/edit-hotel/:hotelId",
          element: <EditHotel />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
