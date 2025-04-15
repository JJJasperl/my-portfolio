// src/pages/Home/Home.jsx
import React, { useEffect, useState } from "react";
import { Particles } from "../components/magicui/particles";
import { BlurFade } from "../components/magicui/blur-fade";
import RadarChart from "../components/RadarChart/RadarChart";
import TimeVisualization from "../components/TimeVisualization/TimeVisualization";
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

    {/* Time Visualization Section */}
    <section id="time" className="time-section">
      <TimeVisualization />
    </section>
    
 {/* Statistics Section */}
<section id="statistics" className="statistics-section">
  {/* Title Block */}
  <div className="statistics-title-block">
    <div className="title-text">Statistics</div>
  </div>

  <div className="statistics-content-container">
    {/* Movie Statistics Block */}
    <div className="statistics-content-block">
      <h3 className="block-title">Movie</h3>
      <p className="block-description">
        The statistics of Movies I have watched.
      </p>
      <div className="chart-container">
        <RadarChart 
          data={[
            { genres: "Drama", count: 120 },
            { genres: "Comedy", count: 85 },
            { genres: "Action", count: 65 },
            { genres: "Science Fiction", count: 45 },
            { genres: "Romance", count: 30 },
            { genres: "Animation", count: 25 },
            { genres: "Fantasy", count: 20 },
            { genres: "Horror", count: 15 }
          ]} 
        />
      </div>
    </div>
    
    {/* Album Statistics Block */}
    <div className="statistics-content-block">
      <h3 className="block-title">Album</h3>
      <p className="block-description">
        The statistics of Music Albums I have listened.
      </p>
      <div className="chart-container">
        <RadarChart 
          data={[
            { genres: "Rock", count: 198 },
            { genres: "Pop", count: 25 },
            { genres: "Folk", count: 21 },
            { genres: "Electronic", count: 16 },
            { genres: "R&B", count: 10 },
            { genres: "Jazz", count: 2 }
          ]} 
        />
      </div>
    </div>
  </div>
</section>



        </main>
      </div>
    </div>
  );
};

export default Home;