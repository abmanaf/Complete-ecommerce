import React, { useState } from "react";
import Image from "../../Components/atoms/Image";
import about_us from "./about__us.avif";
import "./About.css";
import Button from "../../Components/atoms/button/Button";

function About() {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="about-container">
      <div className="about-content">
        <h2 className="about-heading">About Us</h2>
        <p className="about-text">
          {showMore ? (
            <article>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </article>
          ) : (
            <article>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting...
            </article>
          )}
        </p>
        <Button
          className="submit-message"
          type="submit"
          onClick={handleShowMore}
        >
          {showMore ? "Show Less" : "Show more"}
        </Button>
      </div>
      <div className="about-image">
        <Image src={about_us} alt="about us" />
      </div>
    </div>
  );
}

export default About;
