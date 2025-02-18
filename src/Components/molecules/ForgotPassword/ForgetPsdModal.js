import React, { useEffect, useState, useRef } from "react";
import Input from "../../atoms/input/Input";
import { useDispatch } from "react-redux";
import { userResetPassword } from "../../../state/slices/useSlice";
import "./forgetPsd.css";
import Button from "../../atoms/button/Button";
import { useNavigate } from "react-router-dom";

const ForgetPsdModal = ({ setPasswordModal, userEmail }) => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");

  const modalRef = useRef(null);
  const navigate = useNavigate()

  const handleCloseModal = () => {
    setPasswordModal(false);
  };   

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleProceedReset = () => {
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find((user) => user.email === userEmail);

    if (!user) {
      alert("User not found.");
      return;
    }

    const passwordCheck = (password, email, firstName, lastName) => {
      if (password.length < 6) {
        return "Password must be at least 6 characters long";
      }
      if (password.toLowerCase() === email.toLowerCase()) {
        return "Password must not be the same as your email";
      }
      if (
        password.toLowerCase().includes(firstName.toLowerCase()) ||
        password.toLowerCase().includes(lastName.toLowerCase())
      ) {
        return "Password must not contain your first or last name";
      }
      if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter";
      }
      if (!/[0-9]/.test(password)) {
        return "Password must contain at least one number";
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return "Password must contain at least one special character";
      }
      return null;
    };
    

    const passwordError = passwordCheck(
      newPassword,
      user.email,
      user.firstName,
      user.lastName
    );
    if (passwordError) {
      alert(passwordError);
      return;
    }

    dispatch(userResetPassword({ email: user.email, newPassword }));
    setPasswordModal(false);
    navigate('/LoginPage', {state: {message: "Succesfully reset password, Login"}})
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setPasswordModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="forget_password_overlay">
      <div className="forget_password_container" ref={modalRef}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <div className="reset_actions_buttons">
            <Button className="cancel_reset" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button className="proceed_to_reset" onClick={handleProceedReset}>
              Proceed to Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPsdModal;
