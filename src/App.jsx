import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardUser from './pages/DashboardUser';
import Login from './pages/Login';
import Register from './pages/Register';
import DataBuku from "./pages/DataBuku";
import DataUser from "./pages/DataUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

<Route
  path="/admin"
  element={
    <ProtectedRoute role="admin">
      <DashboardAdmin /> {/* Ini sebagai layout wrapper */}
    </ProtectedRoute>
  }
>
  {/* Nested routes di dalam layout DashboardAdmin */}
  <Route index element={<DataBuku />} />
  <Route path="users" element={<DataUser />} />
</Route>


        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <DashboardUser />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
