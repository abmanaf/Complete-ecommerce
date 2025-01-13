import React from "react";
import "./Modal.css";

const Modal = ({ show, onClose, confirmDelete, selectedProduct }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ textAlign: "start" }}>
          <p style={{ textAlign: "center" }}>
            {`Are you sure you want to remove ${selectedProduct.name} from the cart? `}
          </p>
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
            style={{ backgroundColor: "green" }}
            onClick={onClose}
            className="modal-button"
          >
            Cancel
          </button>
          <button
            style={{ backgroundColor: "red" }}
            onClick={confirmDelete}
            className="modal-button"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
