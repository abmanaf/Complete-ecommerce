import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./CheckPointButton.css";
import ModalSecond from "../Modal/ModalSecond";

const CheckPointButton = ({ updateCartCount, setCart }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  //const [contomerDetails, setCustomerDetails] = useState([]);
  const location = useLocation();
  const { productIds, cart } = location.state || {};
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState({
    fullName: false,
    email: false,
    address: false,
    telephone: false,
  });
  const [showModal, setShowModal] = useState(false);

  const calculateTotalAmount = () => {
    if (!cart) return 0;
    return productIds.reduce((total, productId) => {
      const product = cart.find((item) => item.id === productId);
      if (product) {
        return total + product.count * parseFloat(product.price);
      }
      return total;
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

    const isValid = !Object.values(newError).some((value) => value);
    if (isValid) {
      //alert("message sent");
      setShowModal(true);

      updateCartCount(0);
      setCart([]);
      setOrderPlaced(true);
      setFullName("");
      setEmail("");
      setAddress("");
      setTelephone("");
      setError({
        fullName: false,
        email: false,
        address: false,
        telephone: false,
      });
    }
  };
  const handleModalClose = () => {
    setShowModal(false);
    if (orderPlaced) {
      navigate("/CartContent", { state: { cart: [] } });
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-form">
          <form>
            <div className="form-group">
              <label htmlFor="fullName">
                Full Name <span style={{ color: "red" }}>*</span>{" "}
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />{" "}
              {error.fullName && (
                <span className="error-message">This field required</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">
                Email Address <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />{" "}
              {error.email && (
                <span className="error-message">This field is required</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="address">
                Address <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />{" "}
              {error.address && (
                <span className="error-message">This field is required</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phone">
                Phone Number <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="phone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                required
              />{" "}
            </div>
            {error.telephone && (
              <span className="error-message">This field is required</span>
            )}
          </form>
        </div>
        <div className="checkout-products">
          {productIds && (
            <table className="check-point-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Sub Total(GH)</th>
                </tr>
              </thead>
              <tbody>
                {productIds.map((productId) => {
                  const product = cart
                    ? cart.find((item) => item.id === productId)
                    : null;
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
          <button onClick={handleSubmitOrder} className="place-order-btn">
            Place Order
          </button>
        </div>
      </div>
      {orderPlaced && (
        <ModalSecond
          show={showModal}
          onClose={handleModalClose}
          //setSelectedProduct(null);
        />
      )}
    </div>
  );
};

export default CheckPointButton;
