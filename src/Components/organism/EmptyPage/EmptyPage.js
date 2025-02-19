import React from "react";
import Image from "../../atoms/Image";
import emptyCart from "./person-shopping.jpg";
import Navbar from "../../molecules/NavBar/NavBar";

const EmptyPage = () => {
  return (
    <div>
      <Navbar />
      <div id="shopping-cart-list-empty">
        <Image src={emptyCart} alt="empty-page" />
        <strong className="empty-cart-text">Cart is empty</strong>
      </div>
    </div>
  );
};
export default EmptyPage;
