import React from "react";
import "./WhatsAppIcon.css";
import { API_END_POINT } from "../../../config/whatsAppConfig";
import { Link } from "react-router-dom";

export const WhatsAppIcon = () => {
  const whatsappNumber = "+233552669950";
  const whatsappMessage = "Hello, I have a question about your website.";

  const whatsappLink = `${API_END_POINT}send?phone=${whatsappNumber}&text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="chat_me">
      <Link
        className="whatsapp_link_icon"
        to={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="text_in_icon">Need Help? Chat Us</span>
        <i className="fa fa-whatsapp" aria-hidden="true"></i>
      </Link>
    </div>
  );
};
