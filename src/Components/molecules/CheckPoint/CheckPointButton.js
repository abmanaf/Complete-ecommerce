import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCartItemCount,
  removeFromCart,
  clearCart,
  clearCartCount,
} from "../../../state/slices/cartSlice";
import SuccessModal from "../../atoms/Modal/SuccessModal";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";
import Spinner from "../../atoms/spinner/Spinner";
import "./CheckPointButton.css";
import Navbar from "../NavBar/NavBar";

const CheckPointButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const productIds = location.state?.productIds || [];

  const cart = useSelector((state) => state.cart.items);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [error, setError] = useState({
    fullName: "",
    email: "",
    address: "",
    telephone: "",
  });

  const calculateTotalAmount = () => {
    if (!cart || !productIds.length) return 0;
    return productIds.reduce((total, productId) => {
      const product = cart.find((item) => item.id === productId);
      return product
        ? total + product.count * parseFloat(product.price)
        : total;
    }, 0);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const newError = {
      fullName: fullName.trim() === "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      address: address.trim() === "",
      telephone: telephone.trim() === "",
    };
    setError(newError);
    const isValid = !Object.values(newError).some((err) => err);
    if (isValid) {
      setIsOrdering(true);
      setTimeout(() => {
        dispatch(updateCartItemCount({ productId: null, count: 0 }));
        dispatch(removeFromCart());

        setOrderPlaced(true);
        setIsOrdering(false);
        setShowModal(true);
        setFullName("");
        setEmail("");
        setAddress("");
        setTelephone("");
      }, 2000);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  
    if (orderPlaced) {
      dispatch(clearCart());
      dispatch(clearCartCount())
      navigate("/CartContent", { state: { productIds: [] } });
    }
  };
  

  return (
    <di>
      <Navbar />
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-form">
          <form onSubmit={handleSubmitOrder}>
            <div className="form-group">
              <Input
                label="Full name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                error={error.fullName}
              />
            </div>
            <div className="form-group">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={error.email}
              />
            </div>
            <div className="form-group">
              <Input
                label="Address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                error={error.address}
              />
            </div>
            <div className="form-group">
              <Input
                label="Phone Number"
                type="text"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                required
                error={error.telephone}
              />
            </div>
            <Button type="submit" className="place-order-btn">
              {isOrdering ? (
                <div className="order-spinner">
                  <span>Placing</span>
                  <span>
                    <Spinner />
                  </span>
                </div>
              ) : (
                "Place Order"
              )}
            </Button>
          </form>
        </div>
        <div className="checkout-products">
          {productIds && (
            <table className="check-point-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Sub Total (GH)</th>
                </tr>
              </thead>
              <tbody>
                {productIds.map((productId) => {
                  const product = cart.find((item) => item.id === productId);
                  return (
                    <tr key={productId}>
                      <td>{product ? product.name : "Product not found"}</td>
                      <td>{product ? product.count : "N/A"}</td>
                      <td>
                        {product
                          ? (product.count * parseFloat(product.price)).toFixed(
                              2
                            )
                          : "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">
                    Amount to be paid: {calculateTotalAmount().toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
      {orderPlaced && (
        <SuccessModal show={showModal} onClose={handleModalClose} />
      )}
    </div>
    </di>
  );
};

export default CheckPointButton;
