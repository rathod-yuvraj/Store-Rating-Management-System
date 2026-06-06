import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UsersList.css";
import api from "../../api/axios";

function UsersList() {
  const [users, setUsers] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users", {
        params: filters,
      });

      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    fetchUsers();
  };

  return (
    <div className="users-container">
      <div className="users-card">

        <h2>Users Management</h2>

        {/* Filters */}

        <div className="filter-section">

          <input
            type="text"
            name="name"
            placeholder="Search Name"
            value={filters.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="email"
            placeholder="Search Email"
            value={filters.email}
            onChange={handleChange}
          />

          <select
            name="role"
            value={filters.role}
            onChange={handleChange}
          >
            <option value="">All Roles</option>
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
            <option value="STORE_OWNER">
              STORE OWNER
            </option>
          </select>

          <button onClick={handleSearch}>
            Search
          </button>

        </div>

        {/* Table */}

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {users.map((user) => (
              <tr key={user.id}>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.address}</td>

                <td>{user.role}</td>

                <td>
                  <Link
                    className="view-btn"
                    to={`/admin/users/${user.id}`}
                  >
                    View
                  </Link>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}

export default UsersList;