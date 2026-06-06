import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import "./UserDetails.css";

function UserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get(`/admin/users/${id}`);

      setUser(res.data);
    } catch (error) {

      console.log(error);
      
    }
  };

  if (!user) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  return (
    <div className="details-container">

      <div className="details-card">

        <h2>User Details</h2>

        <div className="detail-row">
          <span>Name</span>
          <p>{user.name}</p>
        </div>

        <div className="detail-row">
          <span>Email</span>
          <p>{user.email}</p>
        </div>

        <div className="detail-row">
          <span>Address</span>
          <p>{user.address}</p>
        </div>

        <div className="detail-row">
          <span>Role</span>
          <p>{user.role}</p>
        </div>

        {user.role === "STORE_OWNER" && (
          <div className="detail-row">
            <span>Average Rating</span>
            <p>
              {user.averageRating || "No Ratings"}
            </p>
          </div>
        )}

      </div>

    </div>
  );
}

export default UserDetails;