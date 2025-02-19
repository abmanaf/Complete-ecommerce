import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, reduceQuantity, removeFromCart } from "../../../state/slices/cartSlice";
import Imageurl from "../../atoms/Photoss/Photo";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./CartContent.css";
import EmptyPage from "../EmptyPage/EmptyPage";
import CartContentModal from "../../atoms/Modal/CartContentModal";
import Navbar from "../../molecules/NavBar/NavBar";

const CartContent = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleReduceQuantity = (productId) => {
    dispatch(reduceQuantity(productId));
  };

  const handleRemoveFromCart = (productId) => {
    setSelectedProduct(cart.find((product) => product.id === productId));
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      dispatch(removeFromCart(selectedProduct.id));
      setShowModal(false);
      setSelectedProduct(null);
    }
  };

  const calculateTotalAmount = () => {
    return cart
      .reduce((total, product) => total + product.count * parseFloat(product.price), 0)
      .toFixed(2);
  };

  const handleCheckpointClick = () => {
    const productIds = cart.map((product) => product.id);
    navigate("/CheckPointButton", { state: { productIds } });
  };

  const handleOpenModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  if (!cart.length) return <EmptyPage />;

  return (
    <div>
      <Navbar />
    <div className="shopping-cart-page">
      <div className="shopping-cart-page-margin-top">
        <div id="shopping-cart-list">
          <div className="sub-shopping-cart-page">
            {cart.map((product, index) => (
              <div key={product.id} style={{ borderBottom: index === cart.length - 1 ? "none" : "1px solid #ccc" }}>
                <div className="cart-product-container">
                  <div className="product-items-container">
                    <div>
                      <span className="table-sell-style">
                        <img src={Imageurl(product)} alt={product.name} />
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
                    <button onClick={() => handleRemoveFromCart(product.id)} className="action-button-style">
                      <i className="fa fa-times" aria-hidden="true"></i>
                    </button>

                    <div>
                      <span>{product.price}</span>
                    </div>
                    <div>
                      <span>{(product.count * parseFloat(product.price)).toFixed(2)}</span>
                    </div>
                    <div>
                      <div className="cart-border">
                        <Link onClick={() => handleReduceQuantity(product.id)} className="quantity-button-decrease">
                          -
                        </Link>
                        {product.count}
                        <Link onClick={() => handleIncreaseQuantity(product.id)} className="quantity-button-increase">
                          +
                        </Link>
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
              <div className="total-prices">
                <span>Total</span>
                <span>&cent;{calculateTotalAmount()}</span>
              </div>
              <div className="proceed-to-checkpoint-button">
                <button onClick={handleCheckpointClick}>Proceed To Checkpoint</button>
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
    </div>
  );
};

export default CartContent;
