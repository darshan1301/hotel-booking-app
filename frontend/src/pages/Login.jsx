import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import { loginHandler } from "../services/user.services";
import { useAuth } from "../contexts/AuthContext";
import { usePopupMessage } from "../contexts/PopupMessageContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { displayPopupMessage } = usePopupMessage();

  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!email)
      return displayPopupMessage(
        "Please provide appropriate credentials.",
        "red",
      );

    try {
      const res = await loginHandler(email, password);
      // console.log(res);
      if (res.ok) {
        const { token } = await res.json();
        // console.log(token);
        setToken(token);
        displayPopupMessage("Logged In!");
        navigate(-1);
      } else {
        return displayPopupMessage(
          "Please provide appropriate credentials.",
          "red",
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="my-auto w-96 rounded bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-stone-600">
              Email
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border px-2 py-2 text-sm"
              placeholder="Enter your username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-stone-600">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border px-2 py-2 text-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-stone-600 px-4 py-2 text-white hover:bg-stone-700"
          >
            {isLoading ? "..Logging In" : "Login"}
          </button>
          <div className="mt-4 text-center">
            <span className="text-gray-600">Don&apos;t have an account?</span>{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
