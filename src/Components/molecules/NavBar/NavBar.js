import React, { useState } from "react";
import CustomLink from "../../atoms/customeLink/CustomeLink";
import { Link} from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import UserProfile from "../../organism/Profile/UserProfile";
import CartIcon from "../../atoms/CartIcon/CartIcon";
import "./Index.css";

const Navbar = ({ cartCount }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <nav className="navbar">
      <div
        className={`overlay ${isSideBarOpen ? "active" : ""}`}
        onClick={toggleSideBar}
      >
        <div
          className={`side-bar ${isSideBarOpen ? "open" : "closed"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <CustomLink to="/" closeSideBar={toggleSideBar}>
            Home
          </CustomLink>
          <CustomLink to="/Shop" closeSideBar={toggleSideBar}>
            Shop
          </CustomLink>
          <CustomLink to="/About" closeSideBar={toggleSideBar}>
            About
          </CustomLink>
          <CustomLink to="/Contact" closeSideBar={toggleSideBar}>
            Contact
          </CustomLink>
          <CustomLink to="/LoginPage" closeSideBar={toggleSideBar}>
            Login
          </CustomLink>
        </div>
      </div>
      <div className="navbar-left">
        <li className="site-name">
          <Link to="/">
            {" "}
            AlibabShop
          </Link>
        </li>
      </div>
      <div className="navbar-middle">
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/Shop">Shop</CustomLink>
        <CustomLink to="/About">About</CustomLink>
        <CustomLink to="/Contact">Contact</CustomLink>
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
            <div className="menu-icon">
              <Link to="#" onClick={toggleSideBar}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </Link>
            </div>
          ) : (
            <div className="menu-icon">
              <Link to="#" onClick={toggleSideBar}>
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
