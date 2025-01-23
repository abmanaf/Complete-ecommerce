import React from "react";

const TextArea = ({label,error, className, name, value,onChange, children}) => {
    return(
        <div>
            <div className="label-error">
            <label>{label}</label>
            {error && <span className="error-message">This field is required</span>}
            </div>
            <textarea label={label} className={className} onChange={onChange} name={name} value={value} >{children}</textarea>
        </div>
    )
}
export default TextArea;