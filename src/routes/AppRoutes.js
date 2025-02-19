import React, { useEffect, useState } from "react";
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
import { Provider } from "react-redux";
import { store } from "../state/store/appStore";

const AppRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loader-container">
        <FullPageSpinner />
      </div>
    );
  }

  return (
    <Provider store={store}>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route
            path="/CartContent"
            element={
              <CartContent showModal={showModal} setShowModal={setShowModal} />
            }
          />
          <Route path="/CheckPointButton" element={<CheckPointButton />} />
          <Route path="/SignupPage" element={<SignupPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/Data" element={<Data />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
        </Routes>
        <WhatsAppIcon />
        <FinalFooter />
      </div>
    </Provider>
  );
};

export default AppRoutes;
