import React from "react";

const Image = ({ src, alt,className, ...props }) => {
  return (
    <div className="image">
      <img src={src} alt={alt} className={className} props={props} />
    </div>
  );
};
export default Image;
