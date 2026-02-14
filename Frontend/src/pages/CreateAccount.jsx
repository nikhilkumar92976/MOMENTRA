import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const CreateAccount = () => {
  const [email, setEmail] = useState('')
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const auth = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await auth.signup({ username, fullname, email, password })
      if (res && res.success) {
        toast.success("Account created successfully!")
        navigate('/home')
      }
    } catch (err) {
      const errorMsg = err.message || 'Signup failed'
      setError(errorMsg)
      toast.error(errorMsg)
    }
  }

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
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="text"
            placeholder="Mobile Number or Email"
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500"
          />

          <input
            value={fullname}
            onChange={e => setFullname(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500"
          />

          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500"
          />

          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded font-semibold text-sm transition"
          >
            Sign up
          </button>
        </form>

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

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
