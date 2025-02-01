import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import Input from "../../atoms/input/Input";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../atoms/button/Button";
import Spinner from "../../atoms/spinner/Spinner";

const LoginPage = ({ enteredDetails }) => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState({
    userEmail: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {
      userEmail: userEmail.trim() === "",
      password: password.trim() === "",
    };
    setError(newError);
    const isValid = userEmail && password;
    if (isValid) {
      setIsLoggingIn(true);
      setTimeout(() => {
        if (enteredDetails && enteredDetails.length > 0) {
          const findUser = enteredDetails.find(
            (user) => user.email === userEmail && user.password === password
          );

          if (findUser !== undefined) {
            toast.success(`Welcom ${userEmail}`);
          } else {
            toast.error("user not found");
          }
        } else {
          toast.error("User not found, create an account");
        }
        setIsLoggingIn(false);

        setUserEmail("");
        setPassword("");
      }, 2000);
    }
  };

  return (
    <div className="login-pic-and-forms">
      <div className="form-container" style={{ marginTop: "11.1em" }}>
        <h2 className="login-text">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <Input
              label="Email"
              type="text"
              name="email"
              value={userEmail}
              className="form-input"
              placeholder="Email"
              error={error.userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <Input
              label="Password"
              type="password"
              name="password"
              value={password}
              className="form-input"
              placeholder="Password"
              error={error.password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link to="/ForgotPassword" className="forget-password">
            Forgot password?
          </Link>
          <Button
            type="submit"
            className={`form-button ${isLoggingIn ? "log" : ""}`}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <div className="logging_in">
                <span>LOGIN</span>
                <span>
                  <Spinner />
                </span>
              </div>
            ) : (
              "LOGIN"
            )}
          </Button>
          <p className="form-footer">
            Don't have an account?{" "}
            <Link to="/SignupPage" className="signup-link">
              Sign up
            </Link>
            .
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
