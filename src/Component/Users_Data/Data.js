import React from "react";
import DisplayUserDetails from "../Display_User_Details/DisplayUserDetails";
import "./Data.css";

function Data({ enteredDetails }) {
  return (
    <div className="display-users">
      {enteredDetails.length > 0 ? (
        <DisplayUserDetails enteredDetails={enteredDetails} />
      ) : (
        "empty"
      )}
    </div>
  );
}

export default Data;
