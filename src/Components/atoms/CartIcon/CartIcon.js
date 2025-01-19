import React from "react";
import { Link } from "react-router-dom";
import './cartIcon.css'

const CartIcon = ({ cartCount }) => {
  return (
    <div className="cart__icon">
      <Link
        to="/CartContent"
        className="cart-icon"
      >
        <i className="fa fa-shopping-cart"></i>
        <span
          className="cart-badge"
        >
          {cartCount}
        </span>
      </Link>
    </div>
  );
};

export default CartIcon;
