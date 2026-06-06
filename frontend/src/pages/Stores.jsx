import {
  useEffect,
  useState
} from "react";

import api
from "../api/axios";

export default function Stores() {

  const [stores,setStores]
  = useState([]);

  useEffect(() => {

    fetchStores();

  }, []);

  const fetchStores =
  async () => {

    const res =
      await api.get(
        "/store/all"
      );

    setStores(
      res.data.stores
    );
  };

  const rateStore =
  async (
    storeId,
    rating
  ) => {

    await api.post(
      "/rating/submit",
      {
        storeId,
        rating
      }
    );

    alert(
      "Rating Submitted"
    );
  };

  return (

    <div>

      <h2>
        Stores
      </h2>

      {
        stores.map(
          store => (

          <div
            key={store.id}
          >

            <h3>
              {store.name}
            </h3>

            <p>
              {store.address}
            </p>

            <p>
              Avg:
              {store.averageRating}
            </p>

            <button
              onClick={() =>
                rateStore(
                  store.id,
                  5
                )
              }
            >
              Rate 5
            </button>

          </div>
        ))
      }

    </div>
  );
}