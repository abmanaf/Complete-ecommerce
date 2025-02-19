import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";
import Spinner from "../../atoms/spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../state/slices/useSlice";

const SignupPage = () => {
  const users = useSelector((state) => state.user.enteredDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const {firstName, lastName, email, password} = formData
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = formData;

    const passwordError = passwordCheck(password, email, firstName, lastName);
    const newError = {
      firstName: firstName.trim() === "" ? "First name is required" : "",
      lastName: lastName.trim() === "" ? "Last name is required" : "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Invalid email format"
        : "",
      password: passwordError,
    };
    setError(newError);

    const isValid = !Object.values(newError).some((error) => error);

    if (isValid) {
      if (users.some((user) => user.email === email)) {
        toast.error("Email already registered!");
        return;
      }

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success(
          `${firstName}, your account has been created successfully!`
        );

        const newUser = {
          ...formData,
          userName: `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
          id: Date.now(),
        };
        dispatch(addUser(newUser));

        setFormData({ firstName: "", lastName: "", email: "", password: "" });
        navigate("/LoginPage", {state: {message: "Created successfully, please login"}});
      }, 2000);
    }
  };
  let creatingUser = "Create new account";
  return (
    <>
      <div className="signup-pic-and-forms">
        <div className="form-container" style={{ marginTop: "8em" }}>
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <Input
                label="First name"
                type="text"
                name="firstName"
                className="form-input "
                value={firstName}
                error={error.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <Input
                label="last name"
                type="text"
                name="lastName"
                className="form-input"
                error={error.lastName}
                value={lastName}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <Input
                label="Email"
                type="email"
                name="email"
                className="form-input"
                error={error.email}
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <Input
                label="Password"
                type="password"
                name="password"
                className="form-input"
                error={error.password}
                value={password}
                onChange={handleChange}
              />
            </div>
            <p className="psw-critaria">Your password must:</p>
            <ul className="critaria">
              <li>Be at least 6 characters long</li>
              <li>Not be the same as your email</li>
              <li>Not contain your first or last name</li>
              <li>Contain at least one uppercase letter</li>
              <li>Contain at least one number</li>
              <li>Contain at least one special character</li>
            </ul>
            <Button type="submit" className="form-button">
              {isSubmitting ? (
                <div className="creating_account">
                  {" "}
                  <span>Creating Account</span>{" "}
                  <span>
                    <Spinner />
                  </span>{" "}
                </div>
              ) : (
                creatingUser.toUpperCase()
              )}
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
