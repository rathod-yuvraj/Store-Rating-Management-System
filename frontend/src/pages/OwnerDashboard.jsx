import {
  useEffect,
  useState
} from "react";

import api
from "../api/axios";

export default function OwnerDashboard() {

  const [data,setData]
  = useState(null);

  useEffect(() => {

    api
      .get(
        "/store/owner-dashboard"
      )
      .then(res =>
        setData(
          res.data
        )
      );

  }, []);

  if (!data)
    return <h2>Loading...</h2>;

  return (

    <div>

      <h2>
        {data.storeName}
      </h2>

      <h3>
        Average:
        {data.averageRating}
      </h3>

      <h3>
        Ratings:
        {data.totalRatings}
      </h3>

    </div>
  );
}