import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch single product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/farmer/products/${id}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart ✅");
  };

  if (!product) return <p className="text-white p-10">Loading...</p>;

  return (
    <div className="bg-[#0B1E20] min-h-screen text-gray-200 p-8 pt-20">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-green-400 mb-6 hover:underline"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-[#1E3A3D] rounded-xl p-6">
          <img
            src={product.imageBase64}
            alt={product.name}
            className="rounded-xl w-full"
          />
        </div>
        <div>
          <p className="text-green-400 uppercase">
            {product.categoryName}
          </p>

          <h1 className="text-4xl font-bold mt-2">
            {product.name}
          </h1>

          <p className="text-green-300 text-3xl font-bold mt-4">
            ₹{product.price} / kg
          </p>

          <p className="text-gray-400 mt-4">
            {product.description || "Fresh farm product directly from farmers."}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="bg-[#1E3A3D] px-4 py-2 rounded"
            >
              -
            </button>

            <span className="text-xl">{quantity}</span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="bg-[#1E3A3D] px-4 py-2 rounded"
            >
              +
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="mt-8 w-full bg-green-600 py-3 rounded-full hover:bg-green-700 transition"
          >
            Add to Cart - ₹{product.price * quantity}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;