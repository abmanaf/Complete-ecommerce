import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function FinalFooter() {
  return (
    <div>
      <footer className="footer" style={{ color: "black" }}>
        <div>
          <p
            style={{
              fontSize: "12px",
            }}
          >
            &copy; 2024 AlibabsShop. All rights reserved.
          </p>
        </div>
        <div>
          <div className="footer-social">
            <Link to="https://github.com/abmanaf">
              <i
                style={{ color: "black", padding: "15px 15px" }}
                className="fa fa-github"
              ></i>
            </Link>
            <Link to="https://web.facebook.com/?_rdc=1&_rdr">
              <i
                style={{ color: "black", padding: "15px 15px" }}
                className="fa fa-facebook"
              ></i>
            </Link>
            <Link to="https://twitter.com/home">
              <i
                style={{ color: "black", padding: "15px 15px" }}
                className="fa fa-twitter"
              ></i>
            </Link>
            <Link to="#">
              <i
                style={{ color: "black", padding: "15px 15px" }}
                className="fa fa-instagram"
              ></i>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default FinalFooter;
