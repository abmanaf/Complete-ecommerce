import React from "react";
import "./ModalSecond.css";

function ModalSecond({ show, onClose, confirmDelete, selectedProduct }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ position: "relative" }}>
        <div
          className="success-icon"
          style={{
            position: "absolute",
            top: "-0.8em",
            backgroundColor: "green",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "2em",
          }}
        >
          <i class="fa fa-check" aria-hidden="true"></i>
        </div>
        <div style={{ textAlign: "center" }}>
          <p>Order placed successfully</p>
          <span>Thanks for shopping with Alibabshop</span>
        </div>
        <div
          className="modal-button"
          style={{
            marginTop: "2em",
            display: "flex",
            justifyContent: "center",
            gap: "1em",
          }}
        >
          <button
            style={{ backgroundColor: "red" }}
            onClick={onClose}
            className="modal-button"
          >
            Close
          </button>
          {/* 
          <button
            style={{ backgroundColor: "red" }}
            onClick={confirmDelete}
            className="modal-button"
          >
            Delete
          </button>
          */}
        </div>
      </div>
    </div>
  );
}

export default ModalSecond;
