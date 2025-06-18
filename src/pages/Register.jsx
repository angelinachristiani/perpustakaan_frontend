import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { motion } from "framer-motion";
import { FiUserPlus } from "react-icons/fi";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", form);
      alert("✅ Berhasil daftar! Silakan login.");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data);
      const msg =
        err.response?.data?.message || "Terjadi kesalahan saat mendaftar.";
      alert(`❌ Register gagal:\n\n${msg}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl border border-purple-200"
      >
        <div className="flex items-center justify-center mb-4">
          <FiUserPlus className="text-3xl text-purple-600" />
        </div>
        <h2 className="mb-6 text-2xl font-bold text-center text-purple-700">
          Daftar Akun Baru
        </h2>
        <form onSubmit={register} className="space-y-4">
          <input
            name="name"
            placeholder="👤 Nama Lengkap"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-xl bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            name="email"
            type="email"
            placeholder="📧 Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-xl bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            name="password"
            type="password"
            placeholder="🔒 Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-xl bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition bg-purple-500 rounded-xl hover:bg-purple-600"
          >
            Daftar
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Sudah punya akun?{" "}
          <Link
            to="/"
            className="font-medium text-purple-600 hover:underline"
          >
            Login disini
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
