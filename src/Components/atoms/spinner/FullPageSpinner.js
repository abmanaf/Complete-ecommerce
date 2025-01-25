import React from "react";
import "./fullPageSpinner.css";

const FullPageSpinner = () => (
  <div className="loader-container">
    <div className="spinner-wireframe">
      <div className="wireframe-header"></div>
      <div className="wireframe-nav"></div>
      <div className="wireframe-content">
        <div className="wireframe-sidebar"></div>
        <div className="wireframe-main"></div>
      </div>
      <div className="wireframe-footer"></div>
    </div>
  </div>
);

export default FullPageSpinner;