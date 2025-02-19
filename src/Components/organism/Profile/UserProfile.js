import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./userProfile.css"

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(false);
  const profileRef = useRef(null)

  const handleUserProfile = () => {
    setUserProfile(!userProfile);
  };

  useEffect(() => {
    const handleCloseProfile = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)){
      setUserProfile(false)
    }
  }
    document.addEventListener("mousedown", handleCloseProfile)

    return () => {
      document.removeEventListener("mousedown", handleCloseProfile)
    }
  }, [])
  
  return (
    <div className="login-link" ref={profileRef}>
      <i
        onClick={handleUserProfile}
        className="fa fa-user-circle"
        aria-hidden="true"
      ></i>
      {userProfile && (
        <div className="profile_links">
          <Link  onClick={handleUserProfile} to="/LoginPage">Login</Link>
          <Link  onClick={handleUserProfile} to="/signupPage">Sign Up</Link>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
