import React from "react";
import "./input.css";

const Input = ({
  type,
  className,
  onChange,
  value,
  label,
  error,
  ...props
}) => {
  return (
    <div>
      <div className="label-error">
        <label>{label}</label>
        {error && <span className="error-message">This field is required</span>}
      </div>
      <input
        type={type}
        value={value}
        {...props}
        className={className}
        onChange={onChange}
      />
    </div>
  );
};
export default Input;
