import React from "react";
import { Link } from "react-router-dom";
import { GiHummingbird } from "react-icons/gi";

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* Header */}
      <nav className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">
            <GiHummingbird />
          </span>
          <h1 className="text-xl font-semibold tracking-wide">
            Momentra
          </h1>
        </Link>

        <Link
          to="/signup"
          className="text-sm bg-blue-500 px-4 py-1.5 rounded hover:bg-blue-600 transition"
        >
          Get Started
        </Link>
      </nav>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center px-6 text-center mt-16">

        <h2 className="text-4xl font-bold mb-4">
          What is Momentra?
        </h2>

        <p className="text-gray-400 max-w-md text-sm mb-12">
          Momentra is a social platform designed to help you capture,
          share, and relive your favorite moments. focused on simplicity and connection.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-600 transition">
            <h3 className="font-semibold mb-2">Share Moments</h3>
            <p className="text-sm text-gray-400">
              Post photos and videos instantly and express yourself freely.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-600 transition">
            <h3 className="font-semibold mb-2">Connect</h3>
            <p className="text-sm text-gray-400">
              Follow friends, discover creators, and build your community.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-600 transition">
            <h3 className="font-semibold mb-2">Stay in Control</h3>
            <p className="text-sm text-gray-400">
              Privacy-first features that let you decide who sees your content.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-14">
          <Link
            to="/signup"
            className="bg-blue-500 px-8 py-3 rounded font-medium hover:bg-blue-600 transition"
          >
            Join Momentra
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 py-6">
        © 2026 Momentra · Share Your Moments
      </footer>

    </div>
  );
};

export default LearnMore;

