import React, {useEffect, useRef} from "react";
import "./ModalSecond.css";
import Button from "../button/Button";


const SuccessModal = ({ onClose }) => {
  const modalRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if(modalRef.current && !modalRef.current.contains(e.target)){
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }

  }, [onClose])

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
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
