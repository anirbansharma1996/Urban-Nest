import React from "react";
import "./Hero.css";
import hero_image from "../assets/hero_image.png";
import hand_icon from "../assets/hand_icon.png";
import arrow_icon from "../assets/arrow.png";

const Hero = () => {
//   console.log(hero_image)

  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEWEST ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>newest</p>
            <img src={hand_icon} alt=""/>
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collections</div>
          <img src={arrow_icon} alt=""/>
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt=""/>
      </div>
    </div>
  );
}

export default Hero;
