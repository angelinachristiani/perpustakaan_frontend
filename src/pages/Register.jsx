import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUserPlus } from 'react-icons/fi';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/register', form);
      localStorage.setItem('token', res.data.token);
      const me = await API.get('/me');
      if (me.data.role === 'admin') navigate('/admin');
      else navigate('/user');
    } catch (err) {
      console.error(err.response?.data);
      alert('Register gagal: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-2xl rounded-3xl p-8 max-w-md w-full border border-pink-200"
      >
        <div className="text-center mb-6">
          <FiUserPlus className="mx-auto text-4xl text-rose-500" />
          <h2 className="text-2xl font-bold text-purple-700 mt-2">Buat Akun Baru ✨</h2>
          <p className="text-sm text-gray-500">Daftarkan dirimu sekarang juga</p>
        </div>

        <form onSubmit={register} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-pink-50"
              placeholder="Nama Lengkap"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-pink-50"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-pink-50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-xl font-semibold hover:bg-purple-600 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Sudah punya akun?{' '}
          <a href="/" className="text-purple-600 hover:underline">
            Login di sini
          </a>
        </p>
      </motion.div>
    </div>
  );
}
