import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Adjust path as necessary

function Header() {
  return (
    <header className="flex justify-between items-center bg-[#ce9872] px-6 py-3 text-[#2c2217]">
      <div>
        <Link to="/" className="text-2xl font-bold cursor-pointer">
          <img
            src={logo}
            alt="Shiv Logo"
            className="h-10 w-10 rounded-full cursor-pointer object-cover"
          />
        </Link>
      </div>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-[#d3a17e] rounded px-4 py-1 border border-black hover:bg-[#493b29] hover:text-[#ecd9c6] transition"
        >
          Login
        </Link>
        <Link
          to="/sign-up"
          className="bg-[#d3a17e] text-[#2c2217] rounded px-4 py-1 border border-black hover:bg-[#493b29] hover:text-[#ecd9c6] transition"
        >
          Sign Up
        </Link>
        <Link
          to="/create-user"
          className="bg-[#d3a17e] text-[#2c2217] rounded px-4 py-1 border border-black hover:bg-[#493b29] hover:text-[#ecd9c6] transition"
        >
          Create User
        </Link>
      </div>
    </header>
  );
}

export default Header;
