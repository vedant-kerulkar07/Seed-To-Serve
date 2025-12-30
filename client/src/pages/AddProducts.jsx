import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FiEdit, FiTrash2, FiCheck, FiX, FiArrowLeft } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { showToast } from "@/helpers/showToast";

//  SHADCN FORM
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

//  SHADCN SELECT
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

// ------------------ ZOD SCHEMA ------------------ //

const categorySchema = z.object({
  categoryId: z.string().min(1, "Please select category"),
  name: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().optional(),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  image: z.any().optional(),
});

// ------------------ MAIN COMPONENT ------------------ //

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState(0);
  const [editStock, setEditStock] = useState(0);

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryId: "",
      name: "",
      description: "",
      price: "",
      stock: "",
      image: null,
    },
  });

  // ------------------ FETCH CATEGORY ------------------ //

  const fetchCategoriesList = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/farmer/categories/show/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setCategoriesList(data);
    } catch {
      showToast("error", "Failed to fetch categories");
    }
  };

  // ------------------ FETCH PRODUCTS ------------------ //

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/farmer/products/show/products", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setProducts(data);
    } catch {
      showToast("error", "Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategoriesList();
  }, []);

  // ------------------ ADD PRODUCT ------------------ //
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      const productJson = JSON.stringify({
        categoryId: data.categoryId,
        name: data.name,
        description: data.description || "",
        price: data.price,
        stock: data.stock,
      });

      formData.append("productDto", productJson); // <-- IMPORTANT
      if (data.image) formData.append("image", data.image);

      const res = await fetch(
        "http://localhost:8080/api/farmer/products/add/product",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      console.log(res)
      const newProduct = await res.json();
      setProducts((prev) => [...prev, newProduct]);
      console.log(newProduct)
      form.reset();
      showToast("success", "Product added successfully");

    } catch (err) {
      showToast("error", "Failed to add product");
    } finally {
      setLoading(false);
    }
  };


  // ------------------ DELETE PRODUCT ------------------ //

  const handleDelete = async (name) => {
    if (!confirm(`Delete product "${name}"?`)) return;

    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:8080/api/farmer/products/delete/product/${name}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(products.filter((p) => p.name !== name));
      showToast("success", "Product deleted");
    } catch {
      showToast("error", "Failed to delete product");
    }
  };

  // ------------------ EDIT PRODUCT ------------------ //

  const handleEdit = (index) => {
    const p = products[index];
    setEditIndex(index);
    setEditName(p.name);
    setEditDescription(p.description || "");
    setEditPrice(p.price);
    setEditStock(p.stock);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditName("");
    setEditDescription("");
    setEditPrice("");
    setEditStock("");
  };

  const handleUpdate = async (originalName) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:8080/api/farmer/products/update/product/${originalName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: editName,
            description: editDescription,
            price: editPrice,
            stock: editStock,
          }),
        }
      );

      const updatedProduct = await res.json();
      const updatedList = [...products];
      updatedList[editIndex] = updatedProduct;

      setProducts(updatedList);
      handleCancel();

      showToast("success", "Product updated");
    } catch {
      showToast("error", "Failed to update product");
    }
  };

  // ------------------ UI ------------------ //

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        <Button
          variant="outline"
          className="flex items-center gap-2 mb-4"
          onClick={() => navigate("/farmer-popup")}
        >
          <FiArrowLeft size={18} /> Back
        </Button>

        {/* ADD PRODUCT FORM */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Add New Product
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

              {/* CATEGORY SELECT (shadcn) */}
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="border p-2">
                          <SelectValue placeholder="-- Select Category --" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoriesList.map((cat) => (
                            <SelectItem key={cat._id} value={cat._id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* NAME */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Product Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* DESCRIPTION */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Product Description" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* PRICE */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* STOCK */}
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Stock / Quantity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* IMAGE */}
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Product Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => form.setValue("image", e.target.files[0])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 w-full text-white"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Product"}
              </Button>
            </form>
          </Form>
        </motion.div>

        {/* PRODUCTS TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-md overflow-x-auto"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Products</h2>

          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Category</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Image</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell>{product.categoryName}</TableCell>

                  <TableCell>
                    {editIndex === index ? (
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      product.name
                    )}
                  </TableCell>

                  <TableCell>
                    {editIndex === index ? (
                      <Textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                    ) : (
                      product.description
                    )}
                  </TableCell>

                  <TableCell>
                    {editIndex === index ? (
                      <Input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                      />
                    ) : (
                      `₹ ${product.price}`
                    )}
                  </TableCell>

                  <TableCell>
                    {editIndex === index ? (
                      <Input
                        type="number"
                        value={editStock}
                        onChange={(e) => setEditStock(e.target.value)}
                      />
                    ) : (
                      product.stock
                    )}
                  </TableCell>

                  <TableCell>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                  </TableCell>

                  <TableCell className="text-center flex justify-center space-x-2">
                    {editIndex === index ? (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => handleUpdate(product.name)}
                        >
                          <FiCheck />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-500 hover:bg-red-600"
                          onClick={handleCancel}
                        >
                          <FiX />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          className="bg-yellow-400 hover:bg-yellow-500"
                          onClick={() => handleEdit(index)}
                        >
                          <FiEdit />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => handleDelete(product.name)}
                        >
                          <FiTrash2 />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </div>
  );
};

export default AddProduct;