import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await apiService.login({ email, password });
      
      // Store token and user info
      localStorage.setItem('token', response.token);
      localStorage.setItem('userRole', response.role);
      
      alert("Login successful! Welcome!");
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[#ecd9c6] rounded-lg border border-[#ce9872] shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-[#2c2217] text-center">
        Login to Shiv Accounts
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-[#493b29]">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border border-[#ce9872] rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-[#493b29]">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border border-[#ce9872] rounded px-3 py-2"
            required
          />
        </div>
        {errorMessage && <p className="text-red-700 text-sm">{errorMessage}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#d3a17e] text-[#2c2217] font-semibold py-2 rounded hover:bg-[#493b29] hover:text-[#ecd9c6] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
