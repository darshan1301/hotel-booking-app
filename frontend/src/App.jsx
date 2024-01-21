import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyHotels from "./pages/MyHotels";
import MyBookings from "./pages/MyBookings";
import User from "./pages/User";
import Home from "./pages/Home";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "myHotels",
          element: <MyHotels />,
        },
        {
          path: "myBookings",
          element: <MyBookings />,
        },
        {
          path: "/user",
          element: <User />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
