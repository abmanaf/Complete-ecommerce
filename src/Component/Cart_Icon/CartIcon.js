import React from "react";
import { Link } from "react-router-dom";

const CartIcon = ({ cartCount }) => {
  return (
    <div>
      <Link
        to="/CartContent"
        className="cart-icon"
        style={{ fontSize: "20px" }}
      >
        <i className="fa fa-shopping-cart"></i>
        <span
          className="cart-badge"
          style={{
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {cartCount}
        </span>
      </Link>
    </div>
  );
};

export default CartIcon;
