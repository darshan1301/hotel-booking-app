import { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Your login logic goes here
    console.log("Logging in:", username, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="my-auto w-96 rounded bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold">Login</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-stone-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 w-full rounded-lg border px-2 py-2 text-sm"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-stone-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full rounded-lg border px-2 py-2 text-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="rounded-md bg-stone-600 px-4 py-2 text-white hover:bg-stone-700"
            onClick={handleLogin}
          >
            Login
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
