import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2, FiLogOut } from "react-icons/fi";

export default function DashboardAdmin() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", cover: null });
  const [editId, setEditId] = useState(null);

  const loadBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data);
    } catch (err) {
      alert("❌ Gagal memuat data buku.");
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "cover") {
      setForm({ ...form, cover: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) {
      alert("⚠ Judul dan Penulis wajib diisi.");
      return;
    }

    if (!form.cover && !editId) {
      const confirm = window.confirm("📁 Belum ada cover. Yakin ingin lanjut?");
      if (!confirm) return;
    }

    const data = new FormData();
    data.append("title", form.title);
    data.append("author", form.author);
    if (form.cover) data.append("cover", form.cover);

    try {
      if (editId) {
        await API.post(`/books/${editId}?_method=PUT`, data);
        alert("✅ Buku berhasil diupdate!");
        setEditId(null);
      } else {
        await API.post("/books", data);
        alert("✅ Buku berhasil ditambahkan!");
      }
      setForm({ title: "", author: "", cover: null });
      loadBooks();
    } catch (err) {
      alert("❌ Gagal menyimpan data buku.");
    }
  };

  const handleEdit = (book) => {
    setEditId(book.id);
    setForm({ title: book.title, author: book.author, cover: null });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("⚠ Yakin ingin menghapus buku ini?")) return;
    try {
      await API.delete(`/books/${id}`);
      alert("🗑 Buku berhasil dihapus.");
      loadBooks();
    } catch {
      alert("❌ Gagal menghapus buku.");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Yakin ingin logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      alert("👋 Logout berhasil!");
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-pink-50 via-purple-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl p-6 mx-auto bg-white border border-pink-100 rounded-3xl shadow-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-purple-700">✨ Kelola Buku</h2>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-pink-500 rounded-full shadow hover:bg-pink-600"
          >
            <FiLogOut /> Logout
          </button>
        </div>

        {/* Form Input */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2"
        >
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Judul Buku"
            required
            className="p-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-pink-300"
          />
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Nama Penulis"
            required
            className="p-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-pink-300"
          />
          <label
            htmlFor="cover"
            className="inline-block px-4 py-2 mt-1 text-center text-white bg-purple-500 rounded-xl cursor-pointer hover:bg-purple-600"
          >
            📁 Pilih Gambar
          </label>
          <input
            id="cover"
            name="cover"
            type="file"
            onChange={handleChange}
            accept="image/*"
            className="hidden"
          />
          <button
            type="submit"
            className="col-span-1 py-2 text-white transition bg-pink-500 rounded-xl sm:col-span-2 hover:bg-pink-600"
          >
            {editId ? "🔄 Update Buku" : "➕ Tambah Buku"}
          </button>
        </form>

        {/* Daftar Buku */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {books.map((book) => (
            <motion.div
              key={book.id}
              whileHover={{ scale: 1.02 }}
              className="overflow-hidden bg-white border border-purple-100 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              {book.cover && (
                <img
                  src={book.cover}
                  alt="cover"
                  className="object-cover w-full h-48 rounded-t-2xl"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
                <p className="text-sm text-gray-600 mt-1">✍️ {book.author}</p>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(book)}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-yellow-400 rounded hover:bg-yellow-500"
                  >
                    <FiEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    <FiTrash2 /> Hapus
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {books.length === 0 && (
          <p className="mt-6 text-center text-gray-500 italic">
            Belum ada buku yang ditambahkan.
          </p>
        )}
      </motion.div>
    </div>
  );
}
