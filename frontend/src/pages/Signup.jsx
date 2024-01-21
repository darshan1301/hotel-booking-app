import { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // Your signup logic goes here
    console.log("Signing up:", name, email, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold">Signup</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-stone-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 w-full rounded-lg border px-2 py-2 text-sm"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            type="button"
            className="rounded-md bg-red-500 px-4 py-2 text-white transition-all hover:scale-110 hover:bg-red-600"
            onClick={handleSignup}
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
