import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./StoresList.css";

function StoresList() {

  const [stores, setStores] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {

    try {

      setLoading(true);

      const res = await api.get(
        "/admin/stores",
        {
          params: filters,
        }
      );

      setStores(res.data.stores);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });

  };

  return (

    <div className="stores-container">

      <div className="stores-card">

        <h2>Stores Management</h2>

        {/* Search Section */}

        <div className="search-section">

          <input
            type="text"
            name="name"
            placeholder="Search Store Name"
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

          <input
            type="text"
            name="address"
            placeholder="Search Address"
            value={filters.address}
            onChange={handleChange}
          />

          <button onClick={fetchStores}>
            Search
          </button>

        </div>

        {/* Table */}

        {
          loading ?

            <h3>Loading...</h3>

            :

            <table>

              <thead>

                <tr>

                  <th>Store Name</th>

                  <th>Email</th>

                  <th>Address</th>

                  <th>Owner Name</th>

                  <th>Owner Email</th>

                </tr>

              </thead>

              <tbody>

                {

                  stores.length > 0 ?

                    stores.map((store) => (

                      <tr key={store.id}>

                        <td>{store.name}</td>

                        <td>{store.email}</td>

                        <td>{store.address}</td>

                        <td>
                          {store.owner?.name}
                        </td>

                        <td>
                          {store.owner?.email}
                        </td>

                      </tr>

                    ))

                    :

                    <tr>

                      <td colSpan="5">
                        No Stores Found
                      </td>

                    </tr>

                }

              </tbody>

            </table>

        }

      </div>

    </div>

  );

}

export default StoresList;