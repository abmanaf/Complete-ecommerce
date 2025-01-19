import React, { useState } from "react";
import Button from "../../atoms/button/Button";
import "./forgetPsw.css";

const ForgotPassword = ({ enteredDetails }) => {
  const [resetPassword, setResetPassword] = useState("");

  const handleReset = (e) => {
    setResetPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const findToReset = enteredDetails.find(
      (userToReset) =>
        userToReset.email === resetPassword ||
        userToReset.userName === resetPassword
    );

    if (findToReset) {
      const updatedDetails = enteredDetails.map((user) => {
        if (user.email === findToReset.email) {
          return { ...user, password: "newPassword" };
        }
        return user;
      });
      setResetPassword("");
      console.log("Updated user details:", updatedDetails);
      alert(
        " Check your email and follow the instructions to reset your password Thank you."
      );
    } else {
      alert("User not found. Please check your email or username.");
    }
  };

  return (
    <div className="forget-psw-container">
      <form onSubmit={handleSubmit}>
        <p>
          Please enter your username or email address. You will receive a link
          to create a new password.
        </p>
        <input
          type="text"
          placeholder="email / user Name"
          value={resetPassword}
          onChange={handleReset}
        />{" "}
        <br />
        <Button
          type="submit"
          className="reset-password-button"
          value="Reset Password"
        >
          Reset
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
