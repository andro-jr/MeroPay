import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-avatar">
        <Link to="/">
          <img src="/avatar.jpg" alt="profile-avatar" />
        </Link>
      </div>
      <div className="avatar-info">
        <p>
          <Link to="/">leon lama</Link>
        </p>
        <span>
          <Link to="/">email@email.com</Link>
        </span>
      </div>
    </div>
  );
};

export default Profile;
