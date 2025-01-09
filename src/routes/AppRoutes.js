import React, { useState } from "react";
import Navbar from "../Components/molecules/NavBar/NavBar";
import Home from "../pages/Home_Page/Home";
import Shop from "../pages/Shopping_Page/Shop";
import About from "../pages/About_Us/About";
import Contact from "../pages/Contact/Contact";
import CartContent from "../pages/Cart_Content/CartContent";
import { Route, Routes } from "react-router-dom";
import FinalFooter from "../Components/molecules/Footer/Footer";
import { WhatsAppIcon } from "../Components/atoms/WhatsAppIcon/WhatsAppIcon";
import CheckPointButton from "../Components/molecules/CheckPoint/CheckPointButton";
import LoginPage from "../Components/molecules/LoginPage/LoginPage";
import SignupPage from "../Components/molecules/SignupPage/SignupPage";
import Data from "../Components/atoms/UsersData/Data";
import ForgotPassword from "../Components/molecules/ForgotPassword/ForgotPassword";
 
 const AppRoutes = () => {
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
  export default AppRoutes;
  