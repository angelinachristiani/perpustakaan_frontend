import { useEffect, useState } from 'react';
import API from '../services/api';
import { motion } from 'framer-motion';
import { FiLogOut } from 'react-icons/fi';

export default function DashboardUser() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get('/books')
      .then(res => setBooks(res.data))
      .catch(() => alert('❌ Gagal memuat daftar buku.'));
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm('⚠ Yakin ingin logout?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      alert('👋 Logout berhasil. Sampai jumpa!');
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-pink-50 via-purple-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl p-6 mx-auto bg-white shadow-xl border border-pink-100 rounded-3xl"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-purple-700">📚 Koleksi Buku</h2>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-pink-500 rounded-full shadow hover:bg-pink-600"
          >
            <FiLogOut /> Logout
          </button>
        </div>

        {books.length === 0 ? (
          <p className="text-center text-gray-500 italic">Belum ada buku yang tersedia saat ini 🌸</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {books.map(book => (
              <motion.div
                key={book.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white border border-purple-100 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
              >
                {book.cover && (
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="object-cover w-full h-48 rounded-t-2xl"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">✍️ {book.author}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
