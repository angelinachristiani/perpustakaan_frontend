import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { motion } from "framer-motion";
import { FiLogIn } from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);

      const user = await API.get("/me");
      localStorage.setItem("user", JSON.stringify(user.data));

      alert(`✅ Login Berhasil!\n\nSelamat datang, ${user.data.name}!\nRole: ${user.data.role}`);
      if (user.data.role === "admin") navigate("/admin");
      else navigate("/user");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Email atau password salah, atau server tidak merespon.";
      alert(`❌ Login gagal:\n\n${msg}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl border border-pink-200"
      >
        <div className="flex items-center justify-center mb-4">
          <FiLogIn className="text-3xl text-purple-600" />
        </div>
        <h2 className="mb-6 text-2xl font-bold text-center text-purple-700">
          Masuk ke Akunmu
        </h2>
        <form onSubmit={login} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="📧 Email kamu"
            required
            className="w-full px-4 py-2 border rounded-xl bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="🔒 Password"
            required
            className="w-full px-4 py-2 border rounded-xl bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition bg-pink-500 rounded-xl hover:bg-pink-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="font-medium text-purple-600 hover:underline"
          >
            Daftar disini
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
