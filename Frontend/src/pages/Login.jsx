import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [identifire, setIdentifire] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const auth = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await auth.login(identifire, password)
      if (res && res.success) {
        toast.success("Login successful!")
        navigate('/home')
      }
    } catch (err) {
      const errorMsg = err.message || 'Login failed'
      setError(errorMsg)
      toast.error(errorMsg)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="w-full max-w-sm px-6">

        {/* Logo */}
        <h1 className="text-center text-4xl font-semibold mb-10 tracking-wide">
          Momentra
        </h1>

        {/* Login Form UI */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            value={identifire}
            onChange={e => setIdentifire(e.target.value)}
            type="text"
            placeholder="Phone number, username, or email"
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
            Log in
          </button>
        </form>

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

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
          <Link to="/signup" className="text-blue-400 font-semibold cursor-pointer ml-1">
            Sign up
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
