import { useState } from "react";
import api from "../../api/axios";
import "./ChangePassword.css";

function ChangePassword() {

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {

      setMessage(
        "Passwords do not match"
      );

      return;
    }

    try {

      const res = await api.put(
        "/user/password",
        {
          currentPassword:
            formData.currentPassword,

          newPassword:
            formData.newPassword
        }
      );

      setMessage(
        res.data.message
      );

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  return (

    <div className="password-container">

      <div className="password-card">

        <h2>Change Password</h2>

        {
          message &&
          <div className="message">
            {message}
          </div>
        }

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>
              Current Password
            </label>

            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

          </div>

          <button className="update-btn">
            Update Password
          </button>

        </form>

      </div>

    </div>

  );
}

export default ChangePassword;