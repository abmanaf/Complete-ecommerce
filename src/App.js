import React, { useState } from "react";
import Navbar from "./Component/Nav_Bar/NavBar";
//import { SiteDescription } from "./SiteDescription";
import Home from "./Component/Home_Page/Home";
import Shop from "./Component/Shopping_Page/Shop";
import About from "./Component/About_Us/About";
import Contact from "./Component/Contact/Contact";
import CartContent from "./Component/Cart_Content/CartContent";

import { Route, Routes } from "react-router-dom";
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
        <Route path="/Contact" element={<Contact />} />
        <Route
          path="/CartContent"
          element={
            <CartContent
              cart={cart}
              updateCart={updateCart}
              updateCartCount={updateCartCount}
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
            />
          }
        />
        <Route
          path="/SignupPage"
          element={
            <SignupPage
              updateEnteredDetails={setEnteredDetails}
              enteredDetails={enteredDetails}
            />
          }
        />
        <Route
          path="/LoginPage"
          element={<LoginPage enteredDetails={enteredDetails} />}
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
}
