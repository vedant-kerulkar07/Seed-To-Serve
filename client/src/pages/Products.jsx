import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/farmer/products/show/products",
        );
        const data = await res.json();

        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // ================= FETCH CATEGORIES =================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/farmer/categories/show/categories",
        );
        const data = await res.json();

        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // ================= FILTER LOGIC =================
  useEffect(() => {
    let updated = [...products];

    // Category Filter
    if (selectedCategory !== "All") {
      updated = updated.filter((p) => p.name === selectedCategory);
    }

    // Search Filter
    if (search) {
      updated = updated.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredProducts(updated);
  }, [selectedCategory, search, products]);

  return (
    <div className="bg-[#0B1E20] min-h-screen text-gray-200 p-8 pt-20">
      {/* ================= HEADER ================= */}
      <h1 className="text-5xl font-bold text-green-300">Fresh Products</h1>
      <p className="text-gray-400 mt-2">
        Explore our wide range of farm-fresh produce
      </p>

      {/* ================= FILTER SECTION ================= */}
      <div className="bg-[#10292C] p-6 rounded-xl mt-10">
        {/* Search */}
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full p-3 rounded-lg bg-[#1E3A3D] border border-gray-600 
                     focus:outline-none focus:border-green-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category (Dynamic from API) */}
        <div className="mt-6">
          <p className="mb-2 text-green-300">Category</p>
          <div className="flex flex-wrap gap-3">
            {/* All Button */}
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-1 rounded-full transition ${
                selectedCategory === "All"
                  ? "bg-green-600 text-white"
                  : "bg-[#1E3A3D] hover:bg-green-700"
              }`}
            >
              All
            </button>

            {/* Categories from Backend */}
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-1 rounded-full transition ${
                  selectedCategory === cat.name
                    ? "bg-green-600 text-white"
                    : "bg-[#1E3A3D] hover:bg-green-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <div className="mt-6 text-right">
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearch("");
            }}
            className="text-green-400 hover:underline"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* ================= PRODUCTS GRID ================= */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {filteredProducts.map((item, i) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/dashboard/product/${item.id}`)}
            className="bg-[#1E3A3D] rounded-xl overflow-hidden cursor-pointer"
          >
            <img
              src={item.imageBase64}
              className="h-56 w-full object-cover"
              alt={item.name}
            />

            <div className="p-4">
              <p className="text-sm text-gray-400 uppercase">
                {item.categoryName}
              </p>

              <h3 className="text-xl font-semibold">{item.name}</h3>

              <p className="text-green-300 font-bold mt-2">₹{item.price}/kg</p>

              <button className="mt-3 w-full bg-green-600 py-2 rounded-full hover:bg-green-700 transition">
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Products */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-400 mt-10">No products found.</p>
      )}
    </div>
  );
};

export default ProductPage;
