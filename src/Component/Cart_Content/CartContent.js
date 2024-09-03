import React, { useState } from "react";
import Imageurl from "../Photoss/Photo";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./CartContent.css";
import Modal from "../Modal/Modal";

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

  return (
    <div className="shopping-cart-page">
      {cart.length === 0 ? (
        <div id="shopping-cart-list-empty">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png"
            alt="cart"
          />{" "}
          <br />
          <strong className="empty-cart-text">Cart is empty</strong>
        </div>
      ) : (
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <span className="table-sell-style">
                          <img src={Imageurl(product)} alt={product.id} />
                        </span>
                      </div>
                      <div
                        style={{
                          flexDirection: "column",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <span
                            style={{ marginBottom: "5px" }}
                            className="table-sell-style"
                          >
                            {product.name}
                          </span>
                        </div>
                        <div>
                          <span style={{ marginBottom: "5px" }}>Price</span>
                        </div>
                        <div>
                          <span style={{ marginBottom: "5px" }}>SubTotal</span>
                        </div>
                        <div>
                          <span style={{ marginBottom: "5px" }}>Quantity</span>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{ flexDirection: "column", textAlign: "center" }}
                    >
                      <div className="price-style">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="action-button-style"
                        >
                          <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                      </div>

                      <div>
                        <span className="price-style">{product.price}</span>
                      </div>
                      <div>
                        <span className="price-style">
                          {(product.count * parseFloat(product.price)).toFixed(
                            2
                          )}
                        </span>
                      </div>
                      <div>
                        <div></div>
                        <div className="price-style">
                          <span
                            style={{
                              textAlign: "center",
                            }}
                          >
                            <div className="cart-border">
                              <Link
                                onClick={() => reduceQuantity(product.id)}
                                className="quantity-button-decrease"
                                style={{
                                  textDecoration: "none",
                                }}
                              >
                                -
                              </Link>
                              {product.count}
                              <Link
                                onClick={() => increaseQuantity(product.id)}
                                className="quantity-button-increase"
                                style={{
                                  textDecoration: "none",
                                }}
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
              {/* */}
            </div>
            <div className="check-point-proceed">
              <div className="sub-check-point">
                <h3>Cart Totals</h3> <br />
                <p
                  className=""
                  style={{
                    borderBottom: "1px solid black",
                    marginTop: "3em",
                  }}
                >
                  Total{" "}
                  <span style={{ float: "right" }}>
                    &cent;{calculateTotalAmount(cart)}
                  </span>{" "}
                </p>
                <div
                  className="proceed-to-checkpoint-button"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <button
                    style={{
                      fontWeight: "bolder",
                      width: "100%",
                      marginTop: "5em",
                      padding: "15px 10px",
                      borderRadius: "20px",
                      border: "none",
                      backgroundColor: "rgb(89, 172, 89)",
                      cursor: "pointer",
                      color: "white",
                      textTransform: "uppercase",
                    }}
                    onClick={() => handleCheckpointClick()}
                  >
                    Proceed To Checkpoint
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedProduct(null);
        }}
        confirmDelete={confirmDelete}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default CartContent;
