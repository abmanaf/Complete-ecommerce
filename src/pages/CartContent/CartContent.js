import React, { useState } from "react";
import Imageurl from "../../Components/atoms/Photoss/Photo";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./CartContent.css";
import EmptyPage from "../EmptyPage/EmptyPage";
import CartContentModal from "../../Components/atoms/Modal/CartContentModal";

const CartContent = ({ cart, updateCart, updateCartCount }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((product) => {
      if (
        product.id === productId &&
        product.count < product.availableProduct
      ) {
        return {
          ...product,
          count: product.count + 1,
        };
      }
      return product;
    });

    updateCart(updatedCart);
    updateCartCount(calculateTotalCount(updatedCart));
  };

  const reduceQuantity = (productId) => {
    const updatedCart = cart.map((product) => {
      if (product.id === productId && product.count > 1) {
        return {
          ...product,
          count: product.count - 1,
        };
      }
      return product;
    });

    updateCart(updatedCart);
    updateCartCount(calculateTotalCount(updatedCart));
  };

  const removeFromCart = (productId) => {
    const productToRemove = cart.find((product) => product.id === productId);
    if (productToRemove) {
      setSelectedProduct(productToRemove);
      setShowModal(true);
    }
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      const updatedCart = cart.filter(
        (product) => product.id !== selectedProduct.id
      );
      updateCart(updatedCart);
      updateCartCount(calculateTotalCount(updatedCart));
      setShowModal(false);
      setSelectedProduct(null);
    }
  };

  const calculateTotalCount = (cart) => {
    return cart.reduce((count, product) => count + product.count, 0);
  };

  const calculateTotalAmount = (cart) => {
    return cart
      .reduce((total, product) => {
        return total + product.count * parseFloat(product.price);
      }, 0)
      .toFixed(2);
  };

  const handleCheckpointClick = () => {
    const productIds = cart.map((product) => product.id);
    navigate("/CheckPointButton", {
      state: { productIds, cart },
    });
  };

  const handleOpenModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };
  if (cart.length === 0 || "") return <EmptyPage />;

  return (
    <div className="shopping-cart-page">
      <div className="shopping-cart-page-margin-top">
        <div id="shopping-cart-list">
          <div className="sub-shopping-cart-page">
            {cart.map((product, index) => (
              <div
                key={product.id}
                style={{
                  borderBottom:
                    index === cart.length - 1 ? "none" : "1px solid #ccc",
                }}
              >
                <div className="cart-product-container">
                  <div className="product-items-container">
                    <div>
                      <span className="table-sell-style">
                        <img src={Imageurl(product)} alt={product.id} />
                      </span>
                    </div>
                    <div className="item-list-container">
                      <span className="table-sell-style">{product.name}</span>
                      <span>Price</span>
                      <span>SubTotal</span>
                      <span>Quantity</span>
                    </div>
                  </div>
                  <div className="cart-details">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="action-button-style"
                    >
                      <i className="fa fa-times" aria-hidden="true"></i>
                    </button>

                    <div>
                      <span>{product.price}</span>
                    </div>
                    <div>
                      <span>
                        {(product.count * parseFloat(product.price)).toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <div></div>
                      <div>
                        <span>
                          <div className="cart-border">
                            <Link
                              onClick={() => reduceQuantity(product.id)}
                              className="quantity-button-decrease"
                            >
                              -
                            </Link>
                            {product.count}
                            <Link
                              onClick={() => increaseQuantity(product.id)}
                              className="quantity-button-increase"
                            >
                              +
                            </Link>
                          </div>
                        </span>
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="check-point-proceed">
            <div className="sub-check-point">
              <h3>Cart Totals</h3>
              <div
                className="total-prices"
                style={{
                  borderBottom: "1px solid black",
                  marginTop: "3em",
                }}
              >
                <span>Total</span>
                <span>&cent;{calculateTotalAmount(cart)}</span>
              </div>
              <div className="proceed-to-checkpoint-button">
                <button onClick={() => handleCheckpointClick()}>
                  Proceed To Checkpoint
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <CartContentModal
          show={showModal}
          onClose={handleOpenModal}
          confirmDelete={confirmDelete}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
};

export default CartContent;
