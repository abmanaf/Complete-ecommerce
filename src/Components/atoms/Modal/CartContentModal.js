import React from "react";
import "./Modal.css";
import Button from "../button/Button";

const CartContentModal = ({ onClose, confirmDelete, selectedProduct }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
          <p>
            {`Are you sure you want to remove ${selectedProduct.name} from the cart? `}
          </p>
        <div className="cart_modal_button">
          <Button onClick={onClose} className="cart_modal_button_cancel">
            Cancel
          </Button>
          <Button onClick={confirmDelete} className="cart_modal_button_remove">
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartContentModal;
