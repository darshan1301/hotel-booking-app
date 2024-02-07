import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { signupHandler } from "../services/user.services";
import Error from "../ui/Error";
import { usePopupMessage } from "../contexts/PopupMessageContext";

const Signup = () => {
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { displayPopupMessage } = usePopupMessage();

  const handleSignup = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!email && !firstName && !lastName && !password) {
      displayPopupMessage("fill in the appropriate info", "red");
      return;
    }
    try {
      const res = await signupHandler({ firstName, lastName, email, password });
      if (res.ok) {
        const data = await res.json();
        displayPopupMessage("Signed In!");
        setToken(data.token);
        navigate("/");
      } else {
        const data = await res.json();
        displayPopupMessage(data.message, "red");
      }
    } catch (error) {
      console.log(error);
      return <Error />;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center bg-gray-100">
      <div className="my-auto w-96 rounded bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold">Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-stone-600">
              first Name
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border px-2 py-2 text-sm"
              placeholder="Enter your name"
              value={firstName}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-stone-600">
              last Name
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border px-2 py-2 text-sm"
              placeholder="Enter your name"
              value={lastName}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-stone-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full rounded-lg border px-2 py-2 text-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-red-500 px-4 py-2 text-white transition-all hover:scale-110 hover:bg-red-600"
          >
            {!isLoading ? "Signup" : "...Signing up!"}
          </button>
          <div className="mt-4 text-center">
            <span className="text-gray-600">Already have an account?</span>
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
