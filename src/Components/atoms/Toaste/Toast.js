// Toast.js
import React from "react";
import "./Toast.css"; // We'll define the styles in this CSS file

const Toast = ({ message }) => {
  return (
    <div className="toast-container">
      <div className="toast-message">{message}</div>
      <div className="toast-progress-bar"></div>
    </div>
  );
};

export default Toast;
