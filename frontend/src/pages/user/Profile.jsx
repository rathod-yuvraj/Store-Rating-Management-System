import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Profile.css";

function Profile() {

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const res = await api.get(
        "/user/profile"
      );

      setProfile(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  if (!profile) {

    return (
      <div className="loading">
        Loading...
      </div>
    );

  }

  return (

    <div className="profile-container">

      <div className="profile-card">

        <h2>My Profile</h2>

        <div className="profile-item">
          <label>Name</label>
          <p>{profile.name}</p>
        </div>

        <div className="profile-item">
          <label>Email</label>
          <p>{profile.email}</p>
        </div>

        <div className="profile-item">
          <label>Address</label>
          <p>{profile.address}</p>
        </div>

        <div className="profile-item">
          <label>Role</label>
          <p>{profile.role}</p>
        </div>

      </div>

    </div>

  );
}

export default Profile;