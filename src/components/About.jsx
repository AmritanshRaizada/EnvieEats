import React from "react";
import "../../About.css"; // assuming you keep the CSS separately

const About = () => (
  <div className="about">
    <div className="about-illustration">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4727/4727492.png"
        alt="Cartoon Dev"
        className="about-img"
      />
    </div>
    <h1 className="about-title">About Us</h1>
    <p className="about-text">We are a team of passionate developers.</p>
    <p className="about-text">Our mission is to create amazing web applications.</p>
    <p className="about-text">
      Contact us at:{" "}
      <a href="mailto:amritanshspc@gmail.com" className="about-link">
        Amritansh Email
      </a>
    </p>
  </div>
);

export default About;
