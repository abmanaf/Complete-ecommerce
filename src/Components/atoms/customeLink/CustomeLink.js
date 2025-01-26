import React from "react";
import { Link, useLocation } from "react-router-dom";

const CustomLink = ({ to, children, closeSideBar, ...props }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <div>
      <Link
        className={`nav-link ${isActive ? "active" : ""}`}
        to={to}
        onClick={closeSideBar}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
};

export default CustomLink;
