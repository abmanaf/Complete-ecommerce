import React from "react";
import "./Toast.css";

const Toast = () => {
  return (
    <div className="toast-container">
      <h2 className="toast-title">
        <img src="/assets/images/icon-success.svg" alt="icon-success" />
        <span style={{ color: "white" }}>Account Created</span>
      </h2>
      <p style={{ fontSize: "10px" }} className="toast-desc">
        Thanks for Creating an account with us. Welcome to the soceity!
      </p>
    </div>
  );
};

export default Toast;
