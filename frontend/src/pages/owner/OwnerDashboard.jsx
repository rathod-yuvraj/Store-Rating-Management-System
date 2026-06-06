import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OwnerDashboard.css";
import api from "../../api/axios";

function OwnerDashboard() {

  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    averageRating: 0,
    totalReviews: 0,
    totalUsers: 0
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const res = await api.get(
        "/owner/dashboard"
      );

      setDashboard(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="owner-dashboard">

      <h1>Store Owner Dashboard</h1>

      <div className="dashboard-cards">

        <div className="card rating-card">

          <h3>Average Rating</h3>

          <h1>
            {dashboard.averageRating}
          </h1>

        </div>

        <div className="card review-card">

          <h3>Total Reviews</h3>

          <h1>
            {dashboard.totalReviews}
          </h1>

        </div>

        <div className="card users-card">

          <h3>Users Rated</h3>

          <h1>
            {dashboard.totalUsers}
          </h1>

        </div>

      </div>

      <div className="quick-actions">

        <h2>Quick Actions</h2>

        <button
          onClick={() =>
            navigate("/owner/ratings")
          }
        >
          View Ratings
        </button>

        <button
          onClick={() =>
            navigate(
              "/owner/change-password"
            )
          }
        >
          Change Password
        </button>

      </div>

    </div>

  );
}

export default OwnerDashboard;