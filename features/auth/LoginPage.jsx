import React, { useState } from "react";

export default function LoginPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (loginId === "test@example.com" && password === "password123") {
      alert("Login successful! Welcome!");
    } else {
      setErrorMessage("Invalid Login ID or Password");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[#ecd9c6] rounded-lg border border-[#ce9872] shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-[#2c2217] text-center">
        Login to Shiv Accounts
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-[#493b29]">Login ID</label>
          <input
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            placeholder="Enter your Login ID or Email"
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
          className="w-full bg-[#d3a17e] text-[#2c2217] font-semibold py-2 rounded hover:bg-[#493b29] hover:text-[#ecd9c6] transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
