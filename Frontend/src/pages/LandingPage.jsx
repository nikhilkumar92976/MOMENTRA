import React from "react";
import { GiHummingbird } from "react-icons/gi";
import { Link } from "react-router-dom";
import Galaxy from "../ThirdPartyComponts/Galaxy";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* 🌌 Background Galaxy */}
      <div className="absolute inset-0 z-0">
        <Galaxy />
      </div>

      {/* 🌐 Foreground Content */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-4">
          <div className="flex flex-col items-center cursor-pointer">
            <p className="text-2xl">
              <GiHummingbird />
            </p>
            <h1 className="text-xl font-semibold tracking-wide">
              Momentra
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-gray-300 hover:text-white transition"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="text-sm bg-blue-500 px-4 py-1.5 rounded hover:bg-blue-600 transition"
            >
              Sign up
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Share your moments,
            <br />
            connect with people
          </h2>

          <p
            className="text-gray-400 text-sm max-w-sm mb-8"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            A simple place to share photos, videos, and stay connected with
            friends and creators.
          </p>


          <div className="flex gap-4">
            <Link
              to="/signup"
              className="bg-blue-500 px-6 py-2 rounded font-medium hover:bg-blue-600 transition"
            >
              Get started
            </Link>
            <Link to="/learmore" className="border border-zinc-700 px-6 py-2 rounded font-medium hover:bg-zinc-900 transition">
              Learn more
            </Link >
          </div>
        </main>

        {/* Footer */}
        <div className="flex justify-center gap-6 text-xs text-gray-500 pb-6">
          <Link to="/learmore" className="hover:text-gray-300 cursor-pointer transition">
            About
          </Link>
          <span className="hover:text-gray-300 cursor-pointer transition">
            Privacy
          </span>
          <span className="hover:text-gray-300 cursor-pointer transition">
            Terms
          </span>
          <span className="hover:text-gray-300 cursor-pointer transition">
            Help
          </span>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
