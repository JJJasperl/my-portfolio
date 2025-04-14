// src/pages/Home/Home.jsx
import React, { useEffect, useState } from "react";
import { Particles } from "../components/magicui/particles";
import { BlurFade } from "../components/magicui/blur-fade";
import "./Home.css";

const Home = () => {
  const profileImage = "https://via.placeholder.com/300";
  const [color, setColor] = useState("#333333"); // Default to dark particles on light background

  useEffect(() => {
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setColor(isDarkMode ? "#ffffff" : "#333333");

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setColor(e.matches ? "#ffffff" : "#333333");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="home-container">
      {/* Particles background layer */}
      <div className="particles-background">
        <Particles 
          className="particles" 
          quantity={200}
          ease={80} 
          color={color} 
          refresh 
          size={0.8}
        />
      </div>

      {/* Content layer */}
      <div className="content-layer">
        <main>
          <section id="header">
            <BlurFade delay={0.5} inView>
              <h2>Hi, I'm Jasper 👋</h2>
            </BlurFade>
            <BlurFade delay={1} inView>
              <p>Nice to meet you</p>
            </BlurFade>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;