import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import api from "../../api/axios";

function UserDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalStores: 0,
    myRatings: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/user/dashboard");

      setStats({
        totalStores: res.data.totalStores,
        myRatings: res.data.myRatings,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user-dashboard">

      <h1>User Dashboard</h1>

      <div className="dashboard-cards">

        <div className="card stores-card">
          <h2>Total Stores</h2>
          <h1>{stats.totalStores}</h1>
        </div>

        <div className="card ratings-card">
          <h2>My Ratings</h2>
          <h1>{stats.myRatings}</h1>
        </div>

        <div className="card profile-card">
          <h2>Profile</h2>
          <h3>User Account</h3>
        </div>

      </div>

      <div className="quick-actions">

        <h2>Quick Actions</h2>

        <div className="action-buttons">

          <button
            onClick={() => navigate("/user/stores")}
          >
            Browse Stores
          </button>

          <button
            onClick={() => navigate("/user/profile")}
          >
            View Profile
          </button>

          <button
            onClick={() => navigate("/user/change-password")}
          >
            Change Password
          </button>

        </div>

      </div>

    </div>
  );
}

export default UserDashboard;