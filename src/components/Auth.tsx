import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

interface AuthProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}
const BACKEND_URL = "https://bluecart-backend.onrender.com";



const Auth: React.FC<AuthProps> = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (isLogin) {
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields.");
        return false;
      }
    } else {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("Please fill in all fields.");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        return false;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return false;
      }
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    setLoading(true);
    
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/auth/login`,
        { 
          email: formData.email, 
          password: formData.password 
        }
      );
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.code === "ERR_NETWORK") {
        setError("Cannot connect to server. Please make sure the backend is running on port 3001.");
      } else {
        setError(error.response?.data?.error || "An error occurred during login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    setLoading(true);
    
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );
      
      setIsLogin(true);
      setError("");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      alert("Signup successful! Please log in.");
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.code === "ERR_NETWORK") {
        setError("Cannot connect to server. Please make sure the backend is running on port 3001.");
      } else {
        setError(error.response?.data?.error || "An error occurred during signup");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Darker background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-28 right-24 w-32 h-32 bg-gradient-to-r from-cyan-600/20 to-blue-600/30 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 70, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-28 left-24 w-40 h-40 bg-gradient-to-r from-indigo-600/20 to-sky-600/20 rounded-full blur-2xl"
        />
        
        {/* Subtle grid pattern for better visibility */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.1) 1px, transparent 0)`,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4"
          >
            🔐 Welcome to BlueCart AI
          </motion.h1>
          
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-2"
          >
            Secure, Fast & Seamless Access
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-sm md:text-base"
          >
            Shop smarter, faster, and safer—log in to unlock a world of endless possibilities! 🚀
          </motion.p>
        </header>

        {/* Auth Container - Darker with better contrast */}
        <div className="max-w-md mx-auto bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
          {/* Toggle Buttons */}
          <div className="flex mb-6 bg-gray-800/70 rounded-xl p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl transition-all duration-200 text-sm md:text-base ${
                isLogin
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl transition-all duration-200 text-sm md:text-base ${
                !isLogin
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Signup
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/30 border border-red-500/40 rounded-xl text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Forms */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 transition-all duration-200"
                required={!isLogin}
              />
            )}
            
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 transition-all duration-200"
              required
            />
            
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 transition-all duration-200"
              required
            />
            
            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 transition-all duration-200"
                required={!isLogin}
              />
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {isLogin ? "Logging in..." : "Signing up..."}
                </span>
              ) : (
                isLogin ? "Login" : "Create Account"
              )}
            </button>
          </form>

          {/* Toggle hint */}
          <p className="text-center text-gray-400 mt-6 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-cyan-400 hover:text-cyan-300 underline transition-colors duration-200 ml-1"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>

        {/* Additional info section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-gray-400 text-sm"
        >
          <p>Powered by AI-driven voice technology • End-to-end encryption</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
