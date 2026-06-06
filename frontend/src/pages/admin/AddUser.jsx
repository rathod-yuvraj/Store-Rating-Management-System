import { useState } from "react";
import "./AddUser.css";
import api from "../../api/axios";

function AddUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/admin/users", formData);

      setMessage(res.data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "USER",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="add-user-container">
      <div className="add-user-card">
        <h2>Add New User</h2>

        {message && (
          <div className="message">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>

            <textarea
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Role</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="STORE_OWNER">
                STORE OWNER
              </option>
            </select>
          </div>

          <button className="submit-btn">
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;