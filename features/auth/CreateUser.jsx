import React, { useState } from "react";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [loginId, setLoginId] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginId.length < 6 || loginId.length > 12) {
      alert("Login ID must be 6 to 12 characters long.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email address.");
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must contain lowercase, uppercase, special char, and be at least 8 characters."
      );
      return;
    }
    if (password !== reEnterPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (!role) {
      alert("Please select a role.");
      return;
    }
    alert(`User ${name} with role ${role} created successfully!`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#ecd9c6] rounded shadow">
      <h2 className="text-center text-xl font-semibold mb-6 text-[#2c2217]">
        Create User
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-x-10 gap-y-4"
      >
        <div>
          <label className="block mb-1 font-medium text-[#493b29]">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-[#ce9872] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#d3a17e]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-[#493b29] flex justify-between items-center">
            Role{" "}
            <span className="text-sm italic text-[#7c633e]">Selection field</span>
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full border border-[#ce9872] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#d3a17e]"
          >
            <option value="">Select Role</option>
            <option value="invoicing">Invoicing User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-[#493b29]">Login id</label>
          <input
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            minLength={6}
            maxLength={12}
            required
            className="w-full border border-[#ce9872] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#d3a17e]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-[#493b29]">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-[#ce9872] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#d3a17e]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-[#493b29]">Email id</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-[#ce9872] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#d3a17e]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-[#493b29]">
            Re-Enter password
          </label>
          <input
            type="password"
            value={reEnterPassword}
            onChange={(e) => setReEnterPassword(e.target.value)}
            required
            className="w-full border border-[#ce9872] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#d3a17e]"
          />
        </div>

        <div className="col-span-2 flex gap-4 mt-6">
          <button
            type="submit"
            className="px-6 py-2 border border-[#7c633e] rounded hover:bg-[#d3a17e] hover:text-[#493b29] transition"
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => {
              setName("");
              setLoginId("");
              setEmail("");
              setRole("");
              setPassword("");
              setReEnterPassword("");
            }}
            className="px-6 py-2 border border-[#7c633e] rounded hover:bg-[#f6d2a3] transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
