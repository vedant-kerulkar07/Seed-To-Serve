import { motion } from "framer-motion";
import { Truck, ShieldCheck, Leaf } from "lucide-react";
import { useEffect, useState } from "react";

const UserDashboard = () => {
   const Aa = "https://res.cloudinary.com/dfpgxonqe/image/upload/v1772088432/Aa_jzs8lw.avif";
   const fruits = "https://res.cloudinary.com/dfpgxonqe/image/upload/v1772088626/Fruits_jhlu2y.avif"
   const vegetables = "https://res.cloudinary.com/dfpgxonqe/image/upload/v1772088713/Vegetables_m7ab3d.avif"
  const Grains = "https://res.cloudinary.com/dfpgxonqe/image/upload/v1772088705/Grains_oar20c.avif"


  const [products, setProducts] = useState([]);

  // ✅ FETCH API
 useEffect(() => {
  console.log("UserDashboard mounted ✅");

  const fetchProducts = async () => {
    console.log("Fetching products...");

    try {
      const res = await fetch("http://localhost:8080/api/farmer/products/show/products");

      console.log("Response received:", res);

      const data = await res.json();
      console.log("Data:", data);

      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  fetchProducts();
}, []);
  return (
    <div className="bg-[#0B1E20] text-gray-200 min-h-screen ">

      {/* ================= HERO ================= */}
      <section className="relative w-full min-h-[90vh] flex items-center">
        <img
          src={Aa}
          alt="Farm"
          className="absolute inset-0 w-full h-full object-cover 
               brightness-125 contrast-110 saturate-150"
        />
        <div className="absolute inset-0 bg-[#0B1E20]/50"></div>

        <div className="relative z-10 max-w-6xl px-6 md:px-12">
          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-5xl md:text-6xl font-bold text-green-200"
          >
            From Soil to Soul
          </motion.h1>

          <motion.p
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-200 text-lg max-w-xl"
          >
            Experience fresh farm produce delivered directly to your doorstep.
            Support farmers and eat healthier.
          </motion.p>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 mt-6"
          >
            <button className="bg-[#E07A5F] px-6 py-3 rounded-full hover:scale-105 transition">
              Shop Fresh →
            </button>

            <button className="border border-green-300 px-6 py-3 rounded-full hover:bg-green-800 transition">
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="grid md:grid-cols-3 gap-8 py-16 text-center bg-[#10292C]">
        {[
          { icon: <Truck />, title: "Free Delivery", desc: "On orders above ₹500" },
          { icon: <ShieldCheck />, title: "Quality Assured", desc: "100% fresh guarantee" },
          { icon: <Leaf />, title: "Organic & Pure", desc: "Directly from farms" },
        ].map((item, i) => (
          <motion.div key={i} whileHover={{ scale: 1.08 }}>
            <div className="bg-[#1E3A3D] p-5 rounded-full inline-block mb-4">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-green-300">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-16 px-8">
        <p className="text-center text-sm text-green-400 tracking-widest">
          SHOP BY CATEGORY
        </p>

        <h2 className="text-center text-4xl md:text-5xl font-bold text-green-200 mt-2 mb-10">
          Fresh From The Farm
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Vegetables", img: vegetables },
            { name: "Fruits", img: fruits },
            { name: "Grains", img: Grains },
          ].map((cat, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }}
              className="relative rounded-xl overflow-hidden cursor-pointer"
            >
              <img src={cat.img} className="w-full h-64 object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

              <div className="absolute bottom-5 left-5">
                <h3 className="text-2xl font-bold">{cat.name}</h3>
                <p className="text-sm text-gray-300">
                  Explore fresh {cat.name.toLowerCase()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="py-16 px-8 bg-[#10292C]">
        <p className="text-center text-sm text-green-400 tracking-widest">
          BESTSELLERS
        </p>

        <h2 className="text-center text-4xl md:text-5xl font-bold text-green-200 mt-2">
          Featured Products
        </h2>

        <p className="text-center text-gray-400 mt-2 mb-10">
          Handpicked fresh produce from trusted farmers
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-[#1E3A3D] rounded-xl overflow-hidden"
            >
              <div className="relative">
                <img
                  src={item.imageBase64 || item.imageBase64}
                  className="h-56 w-full object-cover"
                />
                {/* <span className="absolute top-3 left-3 bg-[#E07A5F] text-xs px-3 py-1 rounded-full">
                  SALE
                </span> */}
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-400 uppercase">
                  {item.category || "Vegetables"}
                </p>

                <h3 className="text-xl font-semibold">{item.name}</h3>

                <p className="text-sm text-gray-400">
                  By {item.farmerName || "Farmer"}
                </p>

                <div className="mt-3 flex justify-between items-center">
                  <span className="text-green-300 font-bold">
                    ₹{item.price}/kg
                  </span>

                  <button className="bg-green-600 px-4 py-1 rounded-full text-sm hover:bg-green-700">
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default UserDashboard;