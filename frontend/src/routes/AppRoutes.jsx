import {
  Routes,
  Route
} from "react-router-dom";

import Login
from "../pages/Login";

import Register
from "../pages/Register";

import Stores
from "../pages/Stores";




import ProtectedRoute
from "../components/ProtectedRoute";

export default function AppRoutes() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/stores"
        element={
          <ProtectedRoute>
            <Stores />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute
            role="ADMIN"
          >
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner"
        element={
          <ProtectedRoute
            role="STORE_OWNER"
          >
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}