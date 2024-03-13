import React, { useState, useEffect } from "react";
import Navbar from "./Component/Nav_Bar/NavBar";
//import { SiteDescription } from "./SiteDescription";
import Home from "./Component/Home_Page/Home";
import Shop from "./Component/Shopping_Page/Shop";
import About from "./Component/About_Us/About";
import Contact from "./Component/Contact/Contact";
import CartContent from "./Component/Cart_Content/CartContent";

import { Route, Routes, useNavigate } from "react-router-dom";
import FinalFooter from "./Component/Footer/Footer";
import { WhatsAppIcon } from "./WhatsApp_icon/WhatsAppIcon";
import CheckPointButton from "./Component/Check_Point/CheckPointButton";
import LoginPage from "./Component/Login_Page/LoginPage";
import SignupPage from "./Component/Signup_page/SignupPage";
import Data from "./Component/Users_Data/Data";
import ForgotPassword from "./Component/Forgot_Password/ForgotPassword";

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [enteredDetails, setEnteredDetails] = useState([]);

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
  };
  console.log("updateCartCount in App:", updateCartCount);

  return (
    <div>
      <Navbar cartCount={cartCount} cart={cart} />
      <Routes>
        <Route
          path="/E-commerce-react"
          element={
            <Home
              cart={cart}
              setCart={setCart}
              updateCartCount={updateCartCount}
            />
          }
        />
        <Route
          path="/E-commerce-react/Shop"
          element={
            <Shop
              updateCartCount={updateCartCount}
              cart={cart}
              setCart={setCart}
            />
          }
        />
        <Route path="/E-commerce-react/About" element={<About />} />
        <Route path="/E-commerce-react/Contact" element={<Contact />} />
        <Route
          path="/E-commerce-react/CartContent"
          element={
            <CartContent
              cart={cart}
              updateCart={updateCart}
              updateCartCount={updateCartCount}
            />
          }
        />
        <Route
          path="/E-commerce-react/CheckPointButton"
          element={
            <CheckPointButton
              cart={cart}
              setCart={setCart}
              updateCartCount={updateCartCount}
            />
          }
        />
        <Route
          path="/E-commerce-react/SignupPage"
          element={
            <SignupPage
              updateEnteredDetails={setEnteredDetails}
              enteredDetails={enteredDetails}
            />
          }
        />
        <Route
          path="/E-commerce-react/LoginPage"
          element={<LoginPage enteredDetails={enteredDetails} />}
        />
        <Route
          path="/E-commerce-react/Data"
          element={<Data enteredDetails={enteredDetails} />}
        />
        <Route
          path="/E-commerce-react/ForgotPassword"
          element={<ForgotPassword enteredDetails={enteredDetails} />}
        />
      </Routes>
      <WhatsAppIcon />
      <FinalFooter />
    </div>
  );
}
