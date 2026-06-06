import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    try {

      setLoading(true);

      const response = await api.post(
        "/auth/login",
        formData
      );

      login(response.data);

      const role = response.data.user.role;

      if (role === "ADMIN") {

        navigate("/admin");

      }
      else if (role === "OWNER") {

        navigate("/owner");

      }
      else {

        navigate("/stores");

      }

    }
    catch (error) {

      setError(
        error.response?.data?.message ||
        "Login failed"
      );

    }
    finally {

      setLoading(false);

    }

  };

  return (

    <div className="form-container">

      <h2 className="page-title">
        Login
      </h2>

      {
        error &&
        <p className="error">
          {error}
        </p>
      }

      <form onSubmit={handleSubmit}>

        <div className="form-group">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

        </div>

        <div className="form-group">

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

        </div>

        <button
          className="btn btn-primary"
          style={{ width: "100%" }}
          disabled={loading}
        >
          {
            loading
              ? "Logging in..."
              : "Login"
          }
        </button>

      </form>

      <br />

      <p>

        Don't have an account?

        <Link to="/register">
          Register
        </Link>

      </p>

    </div>

  );
}