import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">

      <h2>Store Rating System</h2>

      {user && (

        <div className="nav-links">

          {/* USER */}

          {user.role === "USER" && (
            <>

              <Link to="/user">
                Dashboard
              </Link>

              <Link to="/user/stores">
                Stores
              </Link>

              <Link to="/user/profile">
                Profile
              </Link>

              <Link to="/user/change-password">
                Change Password
              </Link>

            </>
          )}

          {/* ADMIN */}

          {user.role === "ADMIN" && (
            <>

              <Link to="/admin">
                Dashboard
              </Link>

              <Link to="/admin/users">
                Users
              </Link>

              <Link to="/admin/add-user">
                Add User
              </Link>

              <Link to="/admin/stores">
                Stores
              </Link>

              <Link to="/admin/add-store">
                Add Store
              </Link>

            </>
          )}

          {/* STORE OWNER */}

          {user.role === "OWNER" && (
            <>

              <Link to="/owner">
                Dashboard
              </Link>

              <Link to="/owner/ratings">
                Ratings
              </Link>

              <Link to="/owner/change-password">
                Change Password
              </Link>

            </>
          )}

          <span className="welcome-user">
            Welcome, {user.name}
          </span>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      )}

    </nav>
  );
}