import React from "react";
import './input.css'

const Input = ({ type, className,onChange, value, label, error }) => {
  return (
    <div>
      <div className="label-error"> 
        <label>{label}</label>
        {error && <span className="error-message">This field is required</span>}
      </div>
      <input type={type} onChange={onChange} className={className} value={value} />
    </div>
  );
};
export default Input;
