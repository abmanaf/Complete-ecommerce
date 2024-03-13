import React, { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
//import "@fortawesome/fontawesome-free/css/all.min.css";

import UserProfile from "../Profile/UserProfile";
import CartIcon from "../Cart_Icon/CartIcon";
import "./Index.css";
export default function Navbar({ cartCount }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const openSideBar = () => {
    setIsSideBarOpen(true);
  };

  const closeSideBar = () => {
    setIsSideBarOpen(false);
  };

  return (
    <nav className="navbar">
      <div
        className={`side-bar ${isSideBarOpen ? "open" : "closed"}`}
        style={{ marginTop: "4em" }}
      >
        {/* 
        <div className="close-icon" onClick={closeSideBar}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>
        */}
        <CustomLink
          className="side-bar-context"
          to="/E-commerce-react"
          closeSideBar={closeSideBar}
        >
          Home
        </CustomLink>
        <CustomLink
          className="side-bar-context"
          to="/E-commerce-react/Shop"
          closeSideBar={closeSideBar}
        >
          Shop
        </CustomLink>
        <CustomLink
          className="side-bar-context"
          to="/E-commerce-react/About"
          closeSideBar={closeSideBar}
        >
          About
        </CustomLink>
        <CustomLink
          className="side-bar-context"
          to="/E-commerce-react/Contact"
          closeSideBar={closeSideBar}
        >
          Contact
        </CustomLink>
        <CustomLink
          className="side-bar-context"
          to="/E-commerce-react/LoginPage"
          closeSideBar={closeSideBar}
        >
          Login
        </CustomLink>
      </div>
      <div className="navbar-left">
        <li className="site-name">
          <Link className="" to="/E-commerce-react" closeSideBar={closeSideBar}>
            AlibabShop
          </Link>
        </li>
      </div>
      {/* */}
      <div className="navbar-middle">
        <CustomLink
          className=""
          to="/E-commerce-react"
          closeSideBar={closeSideBar}
          style={{ color: "black" }}
        >
          Home
        </CustomLink>
        <CustomLink
          to="/E-commerce-react/Shop"
          closeSideBar={closeSideBar}
          style={{ color: "black" }}
        >
          Shop
        </CustomLink>
        <CustomLink
          to="/E-commerce-react/About"
          closeSideBar={closeSideBar}
          style={{ color: "black" }}
        >
          About
        </CustomLink>
        <CustomLink
          to="/E-commerce-react/Contact"
          closeSideBar={closeSideBar}
          style={{ color: "black" }}
        >
          Contact
        </CustomLink>
      </div>

      <div className="navbar-right">
        <div className="login-icon">
          <UserProfile to="/E-commerce-react/LoginPage" />
        </div>
        <div className="icon-float">
          <div>
            <CartIcon cartCount={cartCount} />
          </div>
          {isSideBarOpen ? (
            <div className="menu-icon" onClick={closeSideBar}>
              <Link to="#">
                <i className="fa fa-times" aria-hidden="true"></i>
              </Link>
            </div>
          ) : (
            <div className="menu-icon" onClick={openSideBar}>
              <Link to="#">
                <i className="fa fa-bars" aria-hidden="true"></i>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function CustomLink({ to, children, closeSideBar, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  const handleClick = () => {
    closeSideBar();
  };

  return (
    <div
      className={`nav-link ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      <Link to={to} {...props}>
        {children}
      </Link>
    </div>
  );
}
