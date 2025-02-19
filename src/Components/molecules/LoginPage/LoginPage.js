import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { logUserIn } from "../../../state/slices/useSlice";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";
import Spinner from "../../atoms/spinner/Spinner";
import "./LoginPage.css";

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState({
    userEmail: "",
    password: "",
  });
  const users = useSelector((state) => state.user.enteredDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newError = {
      userEmail: userEmail.trim() === "",
      password: password.trim() === "",
    };
    setError(newError);

    const isValid = !Object.values(newError).some((error) => error);
    if (isValid) {
      setIsLoggingIn(true);

      setTimeout(() => {
        const findUser = users.find(
          (user) => user.email === userEmail && user.password === password
        );

        const userLogging = {
          email: userEmail,
          password,
        };

        if (findUser) {
          dispatch(logUserIn(userLogging));
          toast.success(`Welcome, ${userEmail}`);
          setTimeout(() => navigate("/", { state: { message: "Login successful" } }));
        } else {
          toast.error("Invalid email or password");
        }

        setIsLoggingIn(false);
        setUserEmail("");
        setPassword("");
      }, 2000);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="form-container">
        <h2 className="login-text">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <Input
              label="Email"
              type="text"
              name="email"
              value={userEmail}
              className="form-input"
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
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginPage;