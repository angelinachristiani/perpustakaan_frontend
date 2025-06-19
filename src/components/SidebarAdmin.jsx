import { Link, useLocation } from "react-router-dom";

export default function SidebarAdmin() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `block px-4 py-2 rounded hover:bg-purple-100 ${
      pathname === path ? "bg-purple-200 font-bold" : ""
    }`;

  return (
    <aside className="w-full h-full p-4 bg-white border-r sm:w-64">
      <h2 className="mb-4 text-xl font-bold text-purple-700">📚 Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        <Link to="/admin" className={linkClass("/admin")}>📖 Data Buku</Link>
        <Link to="/admin/users" className={linkClass("/admin/users")}>👤 Data User</Link>
        <button
          onClick={() => {
            if (window.confirm("Yakin logout?")) {
              localStorage.clear();
              window.location.href = "/";
            }
          }}
          className="px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
        >
          🔓 Logout
        </button>
      </nav>
    </aside>
  );
}
