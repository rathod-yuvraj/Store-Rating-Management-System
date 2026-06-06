import { useEffect, useState } from "react";
import "./AddStore.css";
import api from "../../api/axios";

function AddStore() {
  const [owners, setOwners] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const res = await api.get("/admin/users?role=STORE_OWNER");

      setOwners(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/admin/stores", formData);

      setMessage(res.data.message);

      setFormData({
        name: "",
        email: "",
        address: "",
        ownerId: "",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="add-store-container">
      <div className="add-store-card">

        <h2>Add New Store</h2>

        {message && (
          <div className="message">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Store Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter Store Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Store Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter Store Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>

            <textarea
              rows="3"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Store Owner</label>

            <select
              name="ownerId"
              value={formData.ownerId}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Store Owner
              </option>

              {owners.map((owner) => (
                <option
                  key={owner.id}
                  value={owner.id}
                >
                  {owner.name} ({owner.email})
                </option>
              ))}
            </select>
          </div>

          <button className="submit-btn">
            Create Store
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddStore;