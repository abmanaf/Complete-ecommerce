import React from "react";
import Image from "../../Components/atoms/Image";
import emptyCart from "./person-shopping.jpg";

const EmptyPage = () => {
  return (
    <div id="shopping-cart-list-empty">
      <Image src={emptyCart} alt="empty-page" />
      <strong className="empty-cart-text">Cart is empty</strong>
    </div>
  );
};
export default EmptyPage;
