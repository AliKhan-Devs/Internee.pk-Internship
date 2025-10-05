import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiBuilding2Line } from "react-icons/ri";
import api from "../utils/api";
import desktopPng from "/desktop.JPG";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/user/register", formData, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Illustration + Branding */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-sky-600 via-indigo-600 to-blue-700 text-white flex-col justify-center items-center p-10">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2 text-4xl font-extrabold">
            PortaBuild
            <RiBuilding2Line className="text-white" />
          </div>
          <p className="text-lg opacity-90 max-w-md mx-auto leading-relaxed">
            Join <span className="font-semibold">PortaBuild</span> and start building
            your professional portfolio effortlessly.  
            Create. Customize. Grow. 🌱
          </p>
          <img
            src={desktopPng}
            alt="Signup Illustration"
            className="rounded-xl shadow-2xl mt-6 w-96"
          />
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 w-11/12 max-w-md"
        >
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Create your account
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1 text-sm">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Ali Khan"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1 text-sm">Username</label>
              <input
                type="text"
                name="userName"
                placeholder="alikhan_dev"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1 text-sm">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1 text-sm">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="+92XXXXXXXXX"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1 text-sm">Password</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-3 rounded-lg mt-6 hover:bg-sky-700 transition-all font-semibold"
          >
            Sign Up
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-sky-600 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
