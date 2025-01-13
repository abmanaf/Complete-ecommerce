import React, { useState } from "react";
import "./Contact.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../Components/atoms/input/Input";
import TextArea from "../../Components/atoms/textArea/TextArea"; 
import contactImage from './finalContact.jpg'
import Image from "../../Components/atoms/Image";

const Contact = () => {
  const [contactingName, setContactingName] = useState("");
  const [contactingEmail, setContactingEmail] = useState("");
  const [contactingMessage, setContactingMessage] = useState("");
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
      setContactingName("");
      setContactingEmail("");
      setContactingMessage("");
      toast.success(`Message sent successfully ${contactingName}`);
    }
    setError(newError);
    console.log(
      `name ${contactingName}, email: ${contactingEmail}, message: ${contactingMessage}`
    );
  };

  return (
    <div className="Contact-container">
      <Image src={contactImage} alt="contact image" className="contact-image"/>
      <div className="contact-forms">
        <form>
          <h2 className="contact">Contact Us</h2>
          <div className="form-group">
            <Input
              label="Name"
              type="text"
              value={contactingName}
              className="name"
              name="name"
              required
              error={error.contactingName}
              onChange={(e) => setContactingName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <Input
              label="Email"
              type="email"
              value={contactingEmail}
              className="email"
              name="email"
              error={error.contactingEmail}
              required
              onChange={(e) => setContactingEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <TextArea
              label="Message"
              className="message"
              name="message"
              required
              error={error.contactingMessage}
              value={contactingMessage}
              onChange={(e) => setContactingMessage(e.target.value)}
            ></TextArea>
          </div>
          <button
            className="submit-message"
            type="submit"
            onClick={handleSendFromContactPage}
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;
