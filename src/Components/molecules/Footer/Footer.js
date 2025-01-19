import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const FinalFooter = () => {
  return (
    <footer className="footer">
        <p>&copy; 2024 AlibabsShop. All rights reserved.</p>
      <div className="footer-social">
        <Link to="https://github.com/abmanaf">
          <i className="fa fa-github"></i>
        </Link>
        <Link to="https://web.facebook.com/?_rdc=1&_rdr">
          <i className="fa fa-facebook"></i>
        </Link>
        <Link to="https://twitter.com/home">
          <i className="fa fa-twitter"></i>
        </Link>
        <Link to="#">
          <i className="fa fa-instagram"></i>
        </Link>
      </div>
    </footer>
  );
};

export default FinalFooter;
