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
import AddHotel from "./pages/AddHotel";
import { loader as hotelLoader } from "./pages/HotelDetails";
import { loader as allHotelsLoader } from "./pages/Home";
import SearchHotels from "./pages/SearchHotels";
import { loader as myHotelsLoader } from "./pages/MyHotels";
import Error from "./ui/Error";
import { loader as userLoader } from "./pages/User";
import SearchBar from "./components/SearchBar";
import { loader as myBookingsLoader } from "./pages/MyBookings";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: allHotelsLoader,
          errorElement: <Error />,
        },
        // {
        //   path: "/",
        //   element: <Home />,
        //   loader: allHotelsLoader,
        //   errorElement: <Error />,
        // },
        // {
        //   path: "/search",
        //   element: <SearchHotels />,
        //   loader: allHotelsLoader,
        //   errorElement: <Error />,
        // },
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
          loader: myHotelsLoader,
          errorElement: <Error />,
        },
        {
          path: "/myBookings",
          element: <MyBookings />,
          loader: myBookingsLoader,
        },
        {
          path: "/user",
          element: <User />,
          loader: userLoader,
        },
        {
          path: "/hotel/:hotelId",
          element: <HotelDetails />,
          loader: hotelLoader,
          errorElement: <Error />,
        },
        {
          path: "/edit-hotel/:hotelId",
          element: <EditHotel />,
        },
        {
          path: "/hotel/addhotel",
          element: <AddHotel />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
