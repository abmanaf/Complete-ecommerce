import React, { useState } from "react";
import "./About.css";
import aboutUs from "./about__us.avif";
import Navbar from "../../molecules/NavBar/NavBar";

function About() {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      <Navbar />
    <div className="about-container">
      <div className="about-wrapper">
        <div className="about-content">
          <h2 className="about-heading">About Our Company</h2>
          
          <div className="about-text">
            {showMore ? (
              <>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy text
                  ever since the 1500s, when an unknown printer took a galley of
                  type and scrambled it to make a type specimen book. It has
                  survived not only five centuries, but also the leap into
                  electronic typesetting, remaining essentially unchanged.
                </p>
                <p>
                  It was popularised in the 1960s with the release of Letraset 
                  sheets containing Lorem Ipsum passages, and more recently with 
                  desktop publishing software like Aldus PageMaker including 
                  versions of Lorem Ipsum.
                </p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s, when an unknown printer took a galley
                  of type and scrambled it to make a type specimen book.
                </p>
              </>
            ) : (
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived not
                only five centuries, but also the leap into electronic
                typesetting...
              </p>
            )}
          </div>
          
          <button 
            className="show-more-btn" 
            onClick={handleShowMore}
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
        
        <div className="about-image-container">
          <div className="about-image-wrapper">
            <img 
              src={aboutUs} 
              alt="About Us" 
              className="about-image" 
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default About;