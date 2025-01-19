import React from "react";
import "./ModalSecond.css";
import Button from "../button/Button";

const SuccessModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="success-icon">
          <i class="fa fa-check" aria-hidden="true"></i>
        </div>
        <div className="modal-text">
          <p>Order placed successfully</p>
          <span>Thanks for shopping with Alibabshop</span>
        </div>
        <div
          className="modal-button"
          style={{
            marginTop: "2em",
          }}
        >
          <Button onClick={onClose} className="modal-button">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
