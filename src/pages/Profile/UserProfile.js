import React from "react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  return (
    <div>
      <Link to="/LoginPage" className="login-link">
        <i className="fa fa-user-circle" aria-hidden="true"></i>
      </Link>
    </div>
  );
};

export default UserProfile;
