import React, { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import UserProfile from "../../../pages/Profile/UserProfile";
import CartIcon from "../../atoms/CartIcon/CartIcon";
import "./Index.css";

const Navbar = ({ cartCount }) => {
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
      >
        <CustomLink to="/" closeSideBar={closeSideBar}>
          Home
        </CustomLink>
        <CustomLink to="/Shop" closeSideBar={closeSideBar}>
          Shop
        </CustomLink>
        <CustomLink to="/About" closeSideBar={closeSideBar}>
          About
        </CustomLink>
        <CustomLink to="/Contact" closeSideBar={closeSideBar}>
          Contact
        </CustomLink>
        <CustomLink to="/LoginPage" closeSideBar={closeSideBar}>
          Login
        </CustomLink>
      </div>
      <div className="navbar-left">
        <li className="site-name">
          <Link to="/" closeSideBar={closeSideBar}>
            {" "}
            AlibabShop
          </Link>
        </li>
      </div>
      <div className="navbar-middle">
        <CustomLink
          to="/"
          closeSideBar={closeSideBar}
          style={{ color: "black" }}
        >
          Home
        </CustomLink>
        <CustomLink
          to="/Shop"
          closeSideBar={closeSideBar}
          style={{ color: "black" }}
        >
          Shop
        </CustomLink>
        <CustomLink
          to="/About"
          closeSideBar={closeSideBar}
          style={{ color: "black" }}
        >
          About
        </CustomLink>
        <CustomLink
          to="/Contact"
          closeSideBar={closeSideBar}
          style={{ color: "black" }}
        >
          Contact
        </CustomLink>
      </div>

      <div className="navbar-right">
        <div className="login-icon">
          <UserProfile to="/LoginPage" />
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
};
export default Navbar;

export function CustomLink({ to, children, closeSideBar, ...props }) {
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
      <Link className="specific-active" to={to} {...props}>
        {children}
      </Link>
    </div>
  );
}