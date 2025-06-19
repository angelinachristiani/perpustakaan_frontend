import SidebarAdmin from "../components/SidebarAdmin";
import { Outlet } from "react-router-dom";

export default function DashboardAdmin() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white">
      <SidebarAdmin />
      <main className="flex-1 p-6">
        <Outlet /> {/* Nampilin isi (DataBuku / DataUser) */}
      </main>
    </div>
  );
}
