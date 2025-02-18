import React, { useState } from "react";
import Button from "../../atoms/button/Button";
import "./forgetPsw.css";
import { useSelector } from "react-redux";
import ForgetPsdModal from "./ForgetPsdModal";
import Input from "../../atoms/input/Input";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
  const users = useSelector((state) => state.user.enteredDetails);
  const [userEmail, setUserEmail] = useState("");
  const [passwordModal, setPasswordModal] = useState(false);
  const [resetUserEmail, setResetUserEmail] = useState("");
  const [error, setError] = useState({
    userEmail: "",
  });

  const handleReset = (e) => {
    setUserEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newError = {
      userEmail: userEmail.trim() === "",
    };
    const isValid = !Object.values(newError).some((error) => error);

    if (isValid) {
      const findToReset = users.find(
        (user) => user.email === userEmail || user.userName === userEmail
      );

      if (findToReset) {
        setResetUserEmail(findToReset.email);
        setPasswordModal(true);
        setUserEmail("");
      } else {
        toast.error("Invalid email");
      }
    }
    setError(newError);
  };

  return (
    <div className="forget-psw-container">
      <form onSubmit={handleSubmit}>
        <p>Please enter your username or email address to reset</p>
        <div>
          <Input
            label="Email / Username"
            type="text"
            value={userEmail}
            onChange={handleReset}
            className={`inp ${error.userEmail ? "border-red" : ""}`}
          />
        </div>
        <br />
        <Button type="submit" className="reset-password-button">
          Reset
        </Button>
      </form>
      {passwordModal && (
        <ForgetPsdModal
          passwordModal={passwordModal}
          setPasswordModal={setPasswordModal}
          userEmail={resetUserEmail}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
