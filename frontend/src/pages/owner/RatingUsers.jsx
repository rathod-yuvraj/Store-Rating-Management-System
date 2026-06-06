import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./RatingsUsers.css";

function RatingsUsers() {

  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {

    try {

      const res = await api.get(
        "/owner/ratings"
      );

      setRatings(
        res.data.ratings
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="ratings-container">

      <div className="ratings-card">

        <h2>Users Who Rated My Store</h2>

        <table>

          <thead>

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Rating</th>

            </tr>

          </thead>

          <tbody>

            {
              ratings.length > 0 ?

              ratings.map((item) => (

                <tr key={item.id}>

                  <td>
                    {item.user.name}
                  </td>

                  <td>
                    {item.user.email}
                  </td>

                  <td>
                    ⭐ {item.rating}
                  </td>

                </tr>

              ))

              :

              <tr>

                <td colSpan="3">
                  No Ratings Found
                </td>

              </tr>
            }

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default RatingsUsers;