import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";
import fetchedData from "./finalContact.jpg";
import Input from "../../Components/atoms/input/Input";
import TextArea from "../../Components/atoms/textArea/TextArea";
import Button from "../../Components/atoms/button/Button";
import Spinner from "../../Components/atoms/spinner/Spinner";

const Contact = () => {
  const [contactingName, setContactingName] = useState("");
  const [contactingEmail, setContactingEmail] = useState("");
  const [contactingMessage, setContactingMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({
    contactingName: false,
    contactingEmail: false,
    contactingMessage: false,
  });

  const newError = {
    contactingName: contactingName.trim() === "",
    contactingEmail: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactingEmail),
    contactingMessage: contactingMessage.trim() === "",
  };

  const isValid = contactingName && contactingEmail && contactingMessage;

  const handleSendFromContactPage = (e) => {
    e.preventDefault();
    if (isValid) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setContactingName("");
      setContactingEmail("");
      setContactingMessage("");
      toast.success(`Message sent successfully`);
      }, 1000);
      
    }
    setError(newError);
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <div className="contact-image-section">
          <img 
            src={fetchedData}
            alt="Contact background" 
            className="contact-image"
          />
        </div>
        <div className="contact-form-section">
          <form onSubmit={handleSendFromContactPage}>
            <h2>Contact Us</h2>
            <div className="form-group">
              <Input
              label="Name"
                type="text"
                value={contactingName}
                onChange={(e) => setContactingName(e.target.value)}
                className={error.contactingName ? 'error' : ''}
                placeholder="Enter your name"
                error={error.contactingName}
              />
      
            </div>
            <div className="form-group">
              <Input
              label="Email"
                type="email"
                value={contactingEmail}
                onChange={(e) => setContactingEmail(e.target.value)}
                className={error.contactingEmail ? 'error' : ''}
                placeholder="Enter your email"
                error={error.contactingEmail}
                
              />
             
            </div>
            <div className="form-group">
              <TextArea
              label="Message"
                value={contactingMessage}
                onChange={(e) => setContactingMessage(e.target.value)}
                className={error.contactingMessage ? 'error' : ''}
                placeholder="Write your message"
                error={error.contactingMessage}
              >Message</TextArea>
             
            </div>
            <Button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
             {isSubmitting ?  <Spinner/>: 'Submit Message'} 
            </Button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;