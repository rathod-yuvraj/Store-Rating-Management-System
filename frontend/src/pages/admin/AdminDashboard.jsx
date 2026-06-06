import { useEffect, useState } from "react";
import {
  FaUsers,
  FaStore,
  FaStar,
  FaUserPlus,
  FaPlusCircle,
  FaList,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");

      setStats({
        totalUsers: res.data.totalUsers,
        totalStores: res.data.totalStores,
        totalRatings: res.data.totalRatings,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>

        <p className="dashboard-subtitle">
          Welcome to Store Rating System
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        {/* Total Users */}
        <div className="stat-card">
          <div className="stat-content">
            <div>
              <p className="stat-label">Total Users</p>

              <h2 className="stat-value">{stats.totalUsers}</h2>
            </div>

            <FaUsers className="icon-blue" />
          </div>
        </div>

        {/* Total Stores */}
        <div className="stat-card">
          <div className="stat-content">
            <div>
              <p className="stat-label">Total Stores</p>

              <h2 className="stat-value">{stats.totalStores}</h2>
            </div>

            <FaStore className="icon-green" />
          </div>
        </div>

        {/* Total Ratings */}
        <div className="stat-card">
          <div className="stat-content">
            <div>
              <p className="stat-label">Total Ratings</p>

              <h2 className="stat-value">{stats.totalRatings}</h2>
            </div>

            <FaStar className="icon-yellow" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="section">
        <h2 className="section-title">Quick Actions</h2>

        <div className="action-grid">
          {/* Add User */}
          <div
            className="action-card"
            onClick={() => navigate("/admin/add-user")}
          >
            <div className="action-content">
              <FaUserPlus className="action-icon-indigo" />

              <div>
                <h3 className="action-title">Add User</h3>

                <p className="action-text">
                  Create Admin, User or Store Owner
                </p>
              </div>
            </div>
          </div>

          {/* Add Store */}
          <div
            className="action-card"
            onClick={() => navigate("/admin/add-store")}
          >
            <div className="action-content">
              <FaPlusCircle className="action-icon-green" />

              <div>
                <h3 className="action-title">Add Store</h3>

                <p className="action-text">
                  Register a new store
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Management */}
      <div className="section">
        <h2 className="section-title">Management</h2>

        <div className="management-grid">
          {/* Users Management */}
          <div
            className="management-card management-blue"
            onClick={() => navigate("/admin/users")}
          >
            <div className="management-content">
              <FaUsers className="management-icon" />

              <div>
                <h2 className="management-title">
                  Users Management
                </h2>

                <p className="management-text">
                  View and manage all users
                </p>
              </div>
            </div>
          </div>

          {/* Stores Management */}
          <div
            className="management-card management-green"
            onClick={() => navigate("/admin/stores")}
          >
            <div className="management-content">
              <FaList className="management-icon" />

              <div>
                <h2 className="management-title">
                  Stores Management
                </h2>

                <p className="management-text">
                  View and manage all stores
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}