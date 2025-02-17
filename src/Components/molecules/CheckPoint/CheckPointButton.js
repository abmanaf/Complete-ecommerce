import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../atoms/Modal/SuccessModal";
import "./CheckPointButton.css";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";
import Spinner from "../../atoms/spinner/Spinner";

const CheckPointButton = ({
  updateCartCount,
  setCart,
  isOrdering,
  setIsOrdering,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const location = useLocation();
  const { productIds, cart } = location.state || {};
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState({
    fullName: "",
    email: "",
    address: "",
    telephone: "",
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

    const isValid = !Object.values(newError).some((err) => err);
    if (isValid) {
      setIsOrdering(true);
      setTimeout(() => {
        updateCartCount(0);
        setCart([]);
        setOrderPlaced(true);
        setIsOrdering(false);
        setFullName("");
        setEmail("");
        setAddress("");
        setTelephone("");
        setError({
          fullName: "",
          email: "",
          address: "",
          telephone: "",
        });
      }, 2000);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (orderPlaced) {
      navigate("/CartContent", { state: { cart: [] } });
    }
  };
  useEffect(() => {
    if (isOrdering) {
      const timer = setTimeout(() => {
        setIsOrdering(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOrdering, setIsOrdering]);

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-form">
          <form>
            <div className="form-group">
              <Input
                label="Full name"
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                error={error.fullName}
              />{" "}
            </div>
            <div className="form-group">
              <Input
                label="Email"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={error.email}
              />{" "}
            </div>
            <div className="form-group">
              <Input
                label="Address"
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                error={error.address}
              />{" "}
            </div>
            <div className="form-group">
              <Input
                label="Phone Number"
                type="text"
                id="phone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                required
                error={error.telephone}
              />{" "}
            </div>
            <Button onClick={handleSubmitOrder} className="place-order-btn">
              {isOrdering ? (
                <div className="order-spinner">
                  <span>Placing</span>
                  <span>
                    <Spinner />
                  </span>
                </div>
              ) : (
                <span>Place Order</span>
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
        </div>
      </div>
      {orderPlaced && !isOrdering && (
        <SuccessModal show={showModal} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default CheckPointButton;
