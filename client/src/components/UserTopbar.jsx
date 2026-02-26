import { motion } from "framer-motion";
import { ShoppingCart, User, Leaf } from "lucide-react";

const UserTopbar = () => {
  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 inset-x-0 flex justify-center z-50 px-4"
    >
      <div
        className="w-full max-w-7xl flex justify-between items-center px-6 py-3 
        rounded-2xl backdrop-blur-lg bg-[#1a2f33]/70 border border-white/10 
        shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
      >

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-green-400 to-emerald-600 p-2 rounded-full">
            <Leaf size={18} />
          </div>
          <h1 className="text-lg font-semibold text-green-300 tracking-wide">
            SeedToServe
          </h1>
        </div>

        {/* NAV LINKS */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <span className="hover:text-green-400 cursor-pointer transition">
            Home
          </span>
          <span className="hover:text-green-400 cursor-pointer transition">
            Products
          </span>
          <span className="hover:text-green-400 cursor-pointer transition">
            Orders
          </span>
        </div>

        {/* ACTION ICONS */}
        <div className="flex items-center gap-4">

          {/* Cart */}
          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-[#243f44] bg-green-600 transition cursor-pointer"
          >
            <ShoppingCart size={18} />
          </motion.div>

          {/* Profile */}
          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-[#243f44] bg-emerald-500 transition cursor-pointer"
          >
            <User size={18} />
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default UserTopbar;