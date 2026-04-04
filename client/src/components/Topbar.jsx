import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import logo from "@/assets/images/logo.png";

const Topbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="w-full bg-[#FFFBE8] border-b border-[#e5e1b0] text-[#1f2937] px-6 py-3 shadow-md rounded-2xl relative">
      <div className="flex items-center justify-between relative">
        {/* Left: Logo */}
        <div
          className="flex items-center cursor-pointer z-10"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover shadow-md ring-2 ring-[#d4c44b] hover:ring-[#c3b538] transition-all duration-300"
          />
        </div>

        {/* Center: Brand Name */}
        <h1
          className="absolute left-1/2 transform -translate-x-1/2 text-3xl md:text-4xl font-extrabold italic tracking-wide text-green-700 
                   hover:scale-105 transition-transform duration-300 animate-fadeIn"
        >
          SeedToServe
        </h1>

        {/* Right: Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 font-medium z-10">
          <Link to="/signup">
            <li className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 transition duration-300 shadow-md hover:shadow-lg">
              Sign Up
            </li>
          </Link>
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-xl z-10"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};

export default Topbar;
