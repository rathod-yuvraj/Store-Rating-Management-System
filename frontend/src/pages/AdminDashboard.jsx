import { useEffect, useState }
from "react";

import api
from "../api/axios";

export default function AdminDashboard() {

  const [stats,setStats]
  = useState({});

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard =
  async () => {

    const res =
      await api.get(
        "/admin/dashboard"
      );

    setStats(
      res.data
    );
  };

  return (

    <div>

      <h2>
        Admin Dashboard
      </h2>

      <h3>
        Users:
        {stats.totalUsers}
      </h3>

      <h3>
        Stores:
        {stats.totalStores}
      </h3>

      <h3>
        Ratings:
        {stats.totalRatings}
      </h3>

    </div>
  );
}