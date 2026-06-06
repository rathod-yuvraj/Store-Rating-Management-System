import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyRatings() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const res = await api.get("/rating/my-ratings");

      setRatings(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load ratings");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">

      <h2>My Ratings</h2>

      {
        ratings.length === 0 ? (
          <p>No ratings found.</p>
        ) : (
          <table
            border="1"
            cellPadding="10"
            style={{
              borderCollapse: "collapse",
              width: "100%"
            }}
          >
            <thead>
              <tr>
                <th>Store Name</th>
                <th>Address</th>
                <th>Rating</th>
                <th>Created At</th>
              </tr>
            </thead>

            <tbody>
              {
                ratings.map((item) => (
                  <tr key={item.id}>
                    <td>{item.Store?.name}</td>

                    <td>{item.Store?.address}</td>

                    <td>{item.rating} ⭐</td>

                    <td>
                      {new Date(
                        item.createdAt
                      ).toLocaleString()}
                    </td>
                  </tr>
                ))
              }
            </tbody>

          </table>
        )
      }

    </div>
  );
}