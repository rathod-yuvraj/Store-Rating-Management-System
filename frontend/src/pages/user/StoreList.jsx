import { useEffect, useState } from "react";
import "./StoreList.css";
import api from "../../api/axios";

function StoreList() {

  const [stores, setStores] = useState([]);

  const [search, setSearch] = useState({
    name: "",
    address: ""
  });

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {

      const res = await api.get("/user/stores", {
        params: search
      });

      setStores(res.data.stores);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {

    setSearch({
      ...search,
      [e.target.name]: e.target.value
    });

  };

  return (
    <div className="store-container">

      <div className="store-card">

        <h2>Stores</h2>

        <div className="search-box">

          <input
            type="text"
            name="name"
            placeholder="Search Store Name"
            value={search.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Search Address"
            value={search.address}
            onChange={handleChange}
          />

          <button onClick={fetchStores}>
            Search
          </button>

        </div>

        <table>

          <thead>

            <tr>
              <th>Store Name</th>
              <th>Address</th>
              <th>Overall Rating</th>
              <th>My Rating</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {stores.map((store) => (

              <tr key={store.id}>

                <td>{store.name}</td>

                <td>{store.address}</td>

                <td>
                  {store.averageRating || "No Ratings"}
                </td>

                <td>
                  {store.userRating || "Not Rated"}
                </td>

                <td>

                  <button className="rate-btn">

                    {
                      store.userRating
                        ? "Update Rating"
                        : "Submit Rating"
                    }

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default StoreList;