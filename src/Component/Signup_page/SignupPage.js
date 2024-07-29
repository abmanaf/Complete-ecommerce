import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";
import Toast from "../Toaste/Toast";
import toast, { Toaster } from "react-hot-toast";

function SignupPage({ updateEnteredDetails }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });
  //const navigate = useNavigate();

  const userName = firstName.toLowerCase() + lastName.toLowerCase();

  const handleSubmitForms = (e) => {
    e.preventDefault();

    const newError = {
      firstName: firstName.trim() === "",
      lastName: lastName.trim() === "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      password:
        password.length < 6 ||
        password === email ||
        password === firstName + lastName,
    };
    setError(newError);

    const isValid = !Object.values(newError).some((value) => value);
    if (isValid) {
      toast((t) => <Toast onClick={() => toast.dismiss(t.id)} />);
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        userName: userName,
        id: Date.now(),
      };
      updateEnteredDetails((prevDetails) => [...prevDetails, newUser]);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      //navigate("/Data");
      //alert("Information added");
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "var(  --Green-medium)",
            color: "#fff",
            marginTop: "4em",
          },
        }}
      />
      <div className="signup-pic-and-forms">
        {/*
        <div className="signup-emoji"></div>
        */}
        <div className="form-container" style={{ marginTop: "8em" }}>
          <h2 style={{ textAlign: "center" }}>Create Account</h2>
          <form onSubmit={handleSubmitForms}>
            <div className="input-container">
              <input
                type="text"
                name="first_name"
                className={`form-input ${error.firstName ? "error" : ""}`}
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              {error.firstName && (
                <span className="error-message">This field is required</span>
              )}
            </div>
            <div className="input-container">
              <input
                type="text"
                name="last_name"
                className={`form-input ${error.lastName ? "error" : ""}`}
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              {error.lastName && (
                <span className="error-message">This field is required</span>
              )}
            </div>
            <div className="input-container">
              <input
                type="email"
                name="email"
                className={`form-input ${error.email ? "error" : ""}`}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {error.email && (
                <span className="error-message">Invalid email address</span>
              )}
            </div>
            <div className="input-container">
              <input
                type="password"
                name="password"
                className={`form-input ${error.password ? "error" : ""}`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error.password && (
                <span className="error-message">
                  Check the password criteria
                </span>
              )}
            </div>
            <p style={{ fontSize: "14px", color: "#777777" }}>
              Your password must:
            </p>
            <ul style={{ fontSize: "14px", color: "#777777" }}>
              <li>Be at least 6 characters long</li>
              <li>Not be the same as your name or email</li>
            </ul>
            <br />
            <button type="submit" className="form-button">
              Create new account
            </button>
            <p className="form-footer" style={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link to="/LoginPage" style={{ color: "#007bff" }}>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
