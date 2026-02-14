import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="w-full max-w-sm px-6">

        {/* Logo */}
        <h1 className="text-center text-4xl font-semibold mb-10 tracking-wide">
          Momentra
        </h1>

        {/* Login Form UI */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Phone number, username, or email"
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500"
          />

          <button
            className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded font-semibold text-sm transition"
          >
            Log in
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6 text-gray-500 text-sm">
          <div className="flex-grow h-px bg-zinc-700"></div>
          <span className="px-4">OR</span>
          <div className="flex-grow h-px bg-zinc-700"></div>
        </div>

        {/* Forgot password */}
        <p className="text-center text-blue-400 text-xs cursor-pointer">
          Forgot password?
        </p>

        {/* Signup */}
        <div className="text-center mt-8 text-sm">
          <span className="text-gray-400">Don’t have an account?</span>
          <Link to="/singup" className="text-blue-400 font-semibold cursor-pointer ml-1">
            Sign up
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
