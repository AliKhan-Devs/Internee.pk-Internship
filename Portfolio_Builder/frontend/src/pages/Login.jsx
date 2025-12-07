import { useState } from "react";
import { useAuth } from "../context/authContext";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import desktopPng from "/desktop.JPG";
import { RiBuilding2Line } from "react-icons/ri";
import { toast } from "sonner";


export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/user/login", formData, { withCredentials: true });
      login(res.data.user);
      navigate("/dashboard");
      setLoading(false);
      toast.success(res.data.message);
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Brand / Illustration */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 text-gray-800 flex-col justify-center items-center p-10">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to <span className="text-indigo-600">PortaBuild <RiBuilding2Line className="inline"/></span>
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Build, customize, and manage your professional portfolio effortlessly —
            all in one modern, elegant platform.
          </p>
          <img
            src={desktopPng}
            alt="Dashboard Preview"
            className="rounded-2xl shadow-xl mt-6 border border-gray-200"
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gradient-to-br from-white via-gray-50 to-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md shadow-lg border border-gray-100 rounded-2xl p-8 w-11/12 max-w-md"
        >
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Sign in to your account
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1 text-sm">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
                value={formData.email}
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
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg mt-6 font-semibold transition-all shadow-md"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign in"}
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-indigo-600 cursor-pointer hover:underline font-medium"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
