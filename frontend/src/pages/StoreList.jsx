import {
  useEffect,
  useState
}
from "react";

import api
from "../api/axios";

export default function StoreList() {

  const [stores, setStores] =
    useState([]);

  useEffect(() => {

    fetchStores();

  }, []);

  const fetchStores =
    async () => {

      const res =
        await api.get(
          "/admin/stores"
        );

      setStores(
        res.data
      );

    };

  return (

    <div>

      <h2>
        Store List
      </h2>

      <table>

        <thead>

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Address</th>

          </tr>

        </thead>

        <tbody>

          {
            stores.map(
              store => (

                <tr key={store.id}>

                  <td>
                    {store.name}
                  </td>

                  <td>
                    {store.email}
                  </td>

                  <td>
                    {store.address}
                  </td>

                </tr>

              )
            )
          }

        </tbody>

      </table>

    </div>

  );
}