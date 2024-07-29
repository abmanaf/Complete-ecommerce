import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
import "./Contact.css";

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

  const isValid = !Object.values(newError).some((value) => value);

  //const [contacting, setContacting] = useState([]);

  const handleSendFromContactPage = (e) => {
    e.preventDefault();
    if (isValid) {
      if (contactingName && contactingEmail && contactingMessage) {
        // Remove the declaration of newContact since it's not used
        // const newContact = {
        //   name: contactingName,
        //   email: contactingEmail,
        //   message: contactingMessage,
        // };

        // setContacting((contacting) => [...contacting, newContact]);

        setContactingName("");
        setContactingEmail("");
        setContactingMessage("");
      } /*else {
        alert("Please fill in all fields before submitting.");
      }
        */
    }
    setError(newError);
    console.log(
      `name ${contactingName}, email: ${contactingEmail}, message: ${contactingMessage}`
    );
  };

  // const location = useLocation();

  return (
    <div className="Contact-container">
      <div className="contact-image"></div>
      <div className="contact-forms">
        <form>
          <h2 className="contact">Contact Us</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className={`name ${error.contactingName ? "error" : ""}`}
              name="name"
              required
              value={contactingName}
              onChange={(e) => setContactingName(e.target.value)}
            />
            {error.contactingName && (
              <span className="error-message">This field is required</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className={`email ${error.contactingEmail ? "error" : ""}`}
              name="email"
              required
              value={contactingEmail}
              onChange={(e) => setContactingEmail(e.target.value)}
            />
            {error.contactingEmail && (
              <span className="error-message">This field is required</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              className={`message ${error.contactingMessage ? "error" : ""}`}
              name="message"
              required
              value={contactingMessage}
              onChange={(e) => setContactingMessage(e.target.value)}
            ></textarea>
            {error.contactingMessage && (
              <span className="error-message">This field is required</span>
            )}
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
    </div>
  );
};

export default Contact;
