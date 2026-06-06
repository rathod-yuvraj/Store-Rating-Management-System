import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import ProtectedRoute from "../components/ProtectedRoute";

/* ---------------- ADMIN ---------------- */

import AdminDashboard from "../pages/admin/AdminDashboard";
import AddUser from "../pages/admin/AddUser";
import AddStore from "../pages/admin/AddStore";
import UserList from "../pages/admin/UserList";
import UserDetails from "../pages/admin/UserDetails";
import StoreListAdmin from "../pages/admin/StoresList";

/* ---------------- USER ---------------- */

import UserDashboard from "../pages/user/UserDashboard";
import StoreList from "../pages/user/StoreList";
import Profile from "../pages/user/Profile";
import ChangePassword from "../pages/user/ChangePassword";

/* ---------------- OWNER ---------------- */

import OwnerDashboard from "../pages/owner/OwnerDashboard";
import RatingsUsers from "../pages/owner/RatingUsers";

import OwnerChangePassword from "../pages/owner/ChangePassword";

export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* ================= ADMIN ================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/add-user"
        element={
          <ProtectedRoute role="ADMIN">
            <AddUser />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/add-store"
        element={
          <ProtectedRoute role="ADMIN">
            <AddStore />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="ADMIN">
            <UserList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users/:id"
        element={
          <ProtectedRoute role="ADMIN">
            <UserDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/stores"
        element={
          <ProtectedRoute role="ADMIN">
            <StoreListAdmin />
          </ProtectedRoute>
        }
      />

      {/* ================= USER ================= */}

      <Route
        path="/user"
        element={
          <ProtectedRoute role="USER">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/stores"
        element={
          <ProtectedRoute role="USER">
            <StoreList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/profile"
        element={
          <ProtectedRoute role="USER">
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/change-password"
        element={
          <ProtectedRoute role="USER">
            <ChangePassword />
          </ProtectedRoute>
        }
      />

      {/* ================= OWNER ================= */}

      <Route
        path="/owner"
        element={
          <ProtectedRoute role="STORE_OWNER">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/ratings"
        element={
          <ProtectedRoute role="STORE_OWNER">
            <RatingsUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/change-password"
        element={
          <ProtectedRoute role="STORE_OWNER">
            <OwnerChangePassword />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}