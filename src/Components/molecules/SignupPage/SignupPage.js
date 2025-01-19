import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignupPage.css";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";

function SignupPage({ updateEnteredDetails }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

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

    const isValid = firstName && lastName && email && password;
    if (isValid) {
      toast.success(`${firstName} Welcome Have nice day`);
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
    }
  };

  return (
    <>
      <div className="signup-pic-and-forms">
        <div className="form-container" style={{ marginTop: "8em" }}>
          <h2>Create Account</h2>
          <form onSubmit={handleSubmitForms}>
            <div className="input-container">
              <Input
                label="First name"
                type="text"
                name="first_name"
                className="form-input "
                placeholder="First name"
                value={firstName}
                error={error.firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input-container">
              <Input
                label="last name"
                type="text"
                name="last_name"
                className="form-input"
                placeholder="Last name"
                error={error.lastName}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="input-container">
              <Input
                label="Email"
                type="email"
                name="email"
                className="form-input"
                placeholder="Email"
                error={error.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <Input
                label="Password"
                type="password"
                name="password"
                className="form-input"
                placeholder="Password"
                error={error.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="psw-critaria">Your password must:</p>
            <ul className="critaria">
              <li>Be at least 6 characters long</li>
              <li>Not be the same as your name or email</li>
            </ul>
            <Button type="submit" className="form-button">
              Create new account
            </Button>
            <p className="form-footer">
              Already have an account?{" "}
              <Link to="/LoginPage" className="login-under-signup">
                Login
              </Link>
            </p>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default SignupPage;
