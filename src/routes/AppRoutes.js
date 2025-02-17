import React, { useState, useEffect } from "react";
import Navbar from "../Components/molecules/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import FinalFooter from "../Components/molecules/Footer/Footer";
import { WhatsAppIcon } from "../Components/atoms/WhatsAppIcon/WhatsAppIcon";
import Home from "../Components/organism/HomePage/Home";
import Shop from "../Components/organism/ShoppingPage/Shop";
import About from "../Components/organism/AboutUs/About";
import Contact from "../Components/organism/Contact/Contact";
import CartContent from "../Components/organism/CartContent/CartContent";
import CheckPointButton from "../Components/molecules/CheckPoint/CheckPointButton";
import LoginPage from "../Components/molecules/LoginPage/LoginPage";
import SignupPage from "../Components/molecules/SignupPage/SignupPage";
import Data from "../Components/atoms/UsersData/Data";
import ForgotPassword from "../Components/molecules/ForgotPassword/ForgotPassword";
import FullPageSpinner from "../Components/atoms/spinner/FullPageSpinner";

const AppRoutes = () => {
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [enteredDetails, setEnteredDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <FullPageSpinner />
      </div>
    );
  }

  return (
    <div>
      <Navbar cartCount={cartCount} cart={cart} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              cart={cart}
              setCart={setCart}
              updateCartCount={updateCartCount}
            />
          }
        />
        <Route
          path="/Shop"
          element={
            <Shop
              updateCartCount={updateCartCount}
              cart={cart}
              setCart={setCart}
            />
          }
        />
        <Route path="/About" element={<About />} />
        <Route
          path="/Contact"
          element={
            <Contact
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          }
        />
        <Route
          path="/CartContent"
          element={
            <CartContent
              cart={cart}
              updateCart={updateCart}
              updateCartCount={updateCartCount}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          }
        />
        <Route
          path="/CheckPointButton"
          element={
            <CheckPointButton
              cart={cart}
              setCart={setCart}
              updateCartCount={updateCartCount}
              isOrdering={isOrdering}
              setIsOrdering={setIsOrdering}
            />
          }
        />
        <Route
          path="/SignupPage"
          element={
            <SignupPage
              updateEnteredDetails={setEnteredDetails}
              enteredDetails={enteredDetails}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          }
        />
        <Route
          path="/LoginPage"
          element={
            <LoginPage
              enteredDetails={enteredDetails}
            />
          }
        />
        <Route
          path="/Data"
          element={<Data enteredDetails={enteredDetails} />}
        />
        <Route
          path="/ForgotPassword"
          element={<ForgotPassword enteredDetails={enteredDetails} />}
        />
      </Routes>
      <WhatsAppIcon />
      <FinalFooter />
    </div>
  );
};

export default AppRoutes;
