"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/app/lib/firebaseConfig";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { FaTrashAlt, FaEdit, FaPlus, FaSave, FaChevronRight, FaHome } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminShop = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // ✅ Product Form State
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [editingProduct, setEditingProduct] = useState<any>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Fetch Products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products.");
    }
    setLoading(false);
  };

  // ✅ Add New Product
  const handleAddProduct = async () => {
    if (!name || !price || !category || !image) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "products"), {
        name,
        price: Number(price),
        category,
        image,
      });

      setProducts([...products, { id: docRef.id, name, price: Number(price), category, image }]);
      toast.success("Product added successfully!");

      setName("");
      setPrice("");
      setCategory("");
      setImage("");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
    }
  };

  // ✅ Edit Product
  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price.toString());
    setCategory(product.category);
    setImage(product.image);
  };

  const handleSaveEdit = async () => {
    if (!editingProduct) return;

    try {
      const productRef = doc(db, "products", editingProduct.id);
      await updateDoc(productRef, {
        name,
        price: Number(price),
        category,
        image,
      });

      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...p, name, price, category, image } : p)));
      toast.success("Product updated successfully!");

      setEditingProduct(null);
      setName("");
      setPrice("");
      setCategory("");
      setImage("");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  // ✅ Delete Product
  const handleDeleteProduct = async (productId: string) => {
    try {
      const productRef = doc(db, "products", productId);
      await deleteDoc(productRef);

      setProducts(products.filter((p) => p.id !== productId));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-lg rounded-lg max-w-5xl mx-auto">
      <ToastContainer />

      {/* ✅ Breadcrumb Navigation */}
      <div className="flex items-center text-gray-600 text-sm mb-4">
        <button onClick={() => router.push("/admin/dashboard")} className="flex items-center gap-1 hover:text-primary transition">
          <FaHome />
          <span className="hidden sm:inline">Dashboard</span>
        </button>
        <FaChevronRight className="mx-2 text-gray-500" />
        <span className="text-primary font-semibold">Manage Shop</span>
      </div>

      {/* ✅ Page Title */}
      <h2 className="text-3xl font-bold text-primary mb-6">Manage Shop</h2>

      {/* ✅ Product Form */}
      <div className="mb-6 p-4 sm:p-6 bg-lightBg rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">{editingProduct ? "Edit Product" : "Add New Product"}</h3>
        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 mb-3 border rounded" />
        <input type="number" placeholder="Price (£)" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-2 mb-3 border rounded" />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 mb-3 border rounded" />
        <input type="text" placeholder="Cloudinary Image URL" value={image} onChange={(e) => setImage(e.target.value)} className="w-full px-4 py-2 mb-3 border rounded" />

        <button
          onClick={editingProduct ? handleSaveEdit : handleAddProduct}
          className="w-full px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300 
            bg-primary hover:bg-opacity-90"
        >
          {editingProduct ? <FaSave className="inline-block mr-2" /> : <FaPlus className="inline-block mr-2" />}
          {editingProduct ? "Save Changes" : "Add Product"}
        </button>
      </div>

      {/* ✅ Product List */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{product.name}</td>
                <td className="p-3">£{Number(product.price).toFixed(2)}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3 flex justify-center gap-3">
                  <button className="p-2 text-gold hover:text-yellow-700" onClick={() => handleEditProduct(product)}>
                    <FaEdit />
                  </button>
                  <button className="p-2 text-red-600 hover:text-red-800" onClick={() => handleDeleteProduct(product.id)}>
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminShop;