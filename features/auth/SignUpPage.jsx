import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/api";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);

    try {
      await apiService.register({ name, email, password, role });
      alert(`Welcome, ${name}! Account created successfully.`);
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[#ecd9c6] rounded-lg border border-[#ce9872] shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-[#2c2217] text-center">
        Sign Up for Shiv Accounts
      </h2>
      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-[#493b29]">Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full border border-[#ce9872] rounded px-3 py-2" 
            required 
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-[#493b29]">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-[#ce9872] rounded px-3 py-2"
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium text-[#493b29]">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
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
            className="w-full border border-[#ce9872] rounded px-3 py-2" 
            required 
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-[#493b29]">Confirm Password</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
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
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
