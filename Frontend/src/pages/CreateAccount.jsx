import React from "react";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="w-full max-w-sm px-6">

        {/* Logo */}
        <h1 className="text-center text-4xl font-semibold mb-6 tracking-wide">
          Momentra
        </h1>

        {/* Subtitle */}
        <p className="text-center text-gray-400 text-sm mb-6">
          Sign up to see photos and videos from your friends.
        </p>

        {/* Signup Form UI */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Mobile Number or Email"
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500"
          />

          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500"
          />

          <input
            type="text"
            placeholder="Username"
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
            Sign up
          </button>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-gray-500 mt-5 leading-relaxed">
          By signing up, you agree to our{" "}
          <span className="text-blue-400 cursor-pointer">Terms</span>,{" "}
          <span className="text-blue-400 cursor-pointer">Privacy Policy</span>{" "}
          and{" "}
          <span className="text-blue-400 cursor-pointer">Cookies Policy</span>.
        </p>

        {/* Divider */}
        <div className="flex items-center my-6 text-gray-500 text-sm">
          <div className="flex-grow h-px bg-zinc-700"></div>
          <span className="px-4">OR</span>
          <div className="flex-grow h-px bg-zinc-700"></div>
        </div>

        {/* Login Redirect */}
        <div className="text-center text-sm">
          <span className="text-gray-400">Have an account?</span>
          <Link to="/login" className="text-blue-400 font-semibold cursor-pointer ml-1">
            Log in
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CreateAccount;
