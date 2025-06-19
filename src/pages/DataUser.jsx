import { useEffect, useState } from "react";
import API from "../services/api";
import { FiTrash2 } from "react-icons/fi";

export default function DataUser() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const res = await API.get("/users"); // pastikan route ini ada di backend
      setUsers(res.data);
    } catch (err) {
      alert("❌ Gagal memuat data user.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus user ini?")) return;
    try {
      await API.delete(`/users/${id}`);
      alert("✅ User berhasil dihapus.");
      loadUsers();
    } catch {
      alert("❌ Gagal menghapus user.");
    }
  };

useEffect(() => {
  API.get('/users')
    .then(res => setUsers(res.data))
    .catch(err => {
      console.error(err);
      alert('❌ Gagal memuat data user.');
    });
}, []);


  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-purple-700">👤 Data User</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id} className="flex items-center justify-between p-4 bg-white border shadow rounded-xl">
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={() => handleDelete(user.id)}
              className="flex items-center px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
            >
              <FiTrash2 className="mr-1" /> Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
