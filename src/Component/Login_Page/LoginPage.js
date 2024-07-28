import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage({ enteredDetails }) {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    userEmail: false,
    password: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    /*
    console.log("entered Details:", enteredDetails);
    console.log("user Email:", userEmail);
    console.log("password:", password);
*/
    const newError = {
      userEmail: userEmail.trim() === "",
      password: password.trim() === "",
    };
    setError(newError);
    const isValid = !Object.values(newError).some((value) => value);
    if (isValid) {
      if (enteredDetails && enteredDetails.length > 0) {
        const findUser = enteredDetails.find(
          (user) => user.email === userEmail && user.password === password
        );

        console.log("findUser:", findUser);

        if (findUser !== undefined) {
          alert(`Welcome ${userEmail}`);
        } else {
          alert("User not found");
        }
      } else {
        alert("User not found, create an account");
      }
      setUserEmail("");
      setPassword("");
    }
  };

  return (
    <div className="login-pic-and-forms">
      <div className="login-emoji"></div>
      <div className="form-container" style={{ marginTop: "11.1em" }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              name="username"
              className="form-input"
              placeholder="Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            {error.userEmail && (
              <span className="error-message">This field is required</span>
            )}
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && (
              <span className="error-message">This field is required</span>
            )}
          </div>
          <Link
            to="/ForgotPassword"
            style={{
              fontSize: "14px",
              color: "#007bff",
              textDecoration: "none",
              float: "right",
            }}
          >
            Forgot password?
          </Link>
          <button type="submit" className="form-button">
            LOGIN
          </button>
          <p className="form-footer" style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link to="/SignupPage" style={{ color: "#007bff" }}>
              Sign up
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
