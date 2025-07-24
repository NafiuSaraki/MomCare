import React, { useState, useEffect } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  // If the user already has a token, redirect to dashboard immediately
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", form);

      // Success
      setMessage("Login successful");
      setIsSuccess(true);

      // Store token and user info in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Wait a bit and redirect user to dashboard
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      // Server or network error
      setMessage(err.response?.data?.message || "An error occurred during login");
      setIsSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
          Login
        </h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300"
          onChange={handleChange}
          value={form.email}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300"
          onChange={handleChange}
          value={form.password}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition duration-300"
        >
          Login
        </button>
        {message && (
          <div
            className={`mt-4 p-3 text-center rounded-xl text-sm ${
              isSuccess
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;