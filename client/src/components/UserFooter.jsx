import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Phone, Mail } from "lucide-react";
import icon from "../assets/images/logo.png";

export default function UserFooter() {
  return (
    <footer className="bg-[#0B1E20] text-gray-300 pb-5 relative overflow-hidden">

      {/* Top Contact Bar */}
      <div className="w-full bg-[#10292C] py-4 px-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#1E3A3D]">
        <div className="flex items-center gap-2">
          <Phone size={18} className="text-green-400" />
          <p className="text-sm font-medium">+91 7219213732</p>
        </div>
        <div className="flex items-center gap-2">
          <Mail size={18} className="text-green-400" />
          <p className="text-sm font-medium">
            seedtoservewebapplication@gmail.com
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mt-12">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <img src={icon} alt="logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-2xl font-bold text-green-300">
              SeedToServe
            </h1>
          </div>

          <p className="text-gray-400 mt-4 text-sm leading-relaxed">
            🌱 Empowering Farmers, Connecting Communities.  
            A platform where Indian farmers sell directly to consumers,
            ensuring freshness and fair pricing.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-6">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
              (Icon, i) => (
                <div
                  key={i}
                  className="bg-[#1E3A3D] p-3 rounded-full 
                             hover:bg-green-600 transition duration-300 
                             cursor-pointer"
                >
                  <Icon size={14} />
                </div>
              )
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-300">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-green-400 cursor-pointer transition">
              Buy
            </li>
            <li className="hover:text-green-400 cursor-pointer transition">
              Products
            </li>
            <li className="hover:text-green-400 cursor-pointer transition">
              About Us
            </li>
          </ul>
        </div>

        {/* Working Time */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-300">
            Working Time
          </h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Mon - Fri: 9.00am - 5.00pm</li>
            <li>Saturday: 10.00am - 6.00pm</li>
            <li>Sunday Closed</li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-300">
            Our Address
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Shivajinagar, Pune <br />
            411001, India
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-[#1E3A3D] mt-12 pt-6 pb-2"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between text-sm text-gray-500">
        <div className="flex gap-6">
          <p className="hover:text-green-400 cursor-pointer transition">
            Terms & Conditions
          </p>
          <p className="hover:text-green-400 cursor-pointer transition">
            Privacy Policy
          </p>
        </div>

        <p className="mt-3 md:mt-0">
          © 2025 <span className="text-green-400">SeedToServe</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}