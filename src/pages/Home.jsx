// src/pages/Home/Home.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedTitle from "../components/AnimatedTitle/AnimatedTitle";
import { Particles } from "../components/magicui/particles";
import { BlurFade } from "../components/magicui/blur-fade";
import "./Home.css";

// Import social icons or use components like react-icons
// const socialLinks = [
//   { name: 'Email', icon: '✉️', url: 'mailto:youremail@example.com' },
//   { name: 'GitHub', icon: '🐙', url: 'https://github.com/yourusername' },
//   { name: 'LinkedIn', icon: '🔗', url: 'https://linkedin.com/in/yourusername' },
//   { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/yourusername' },
// ];

const Home = () => {
  // Sample profile image URL - replace with your actual image
  const profileImage = "https://via.placeholder.com/300";

  // State for particles color
  const [color, setColor] = useState("#ffffff");

  // You can implement a dark mode detection if needed
  useEffect(() => {
    // Example: detect system preference
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setColor(isDarkMode ? "#ffffff" : "#333333");

    // Listen for changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setColor(e.matches ? "#ffffff" : "#333333");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="home-container">
      {/* Add the Particles component in a dedicated container */}
      <div className="particles-container">
        <Particles quantity={100} ease={80} color={color} refresh />
      </div>

      <main>
        <section id="header">
          <BlurFade delay={0.5} inView>
            <h2>Hi, I'm Jasper 👋</h2>
          </BlurFade>
          <BlurFade delay={0.5 * 2} inView>
            <p>Nice to meet you</p>
          </BlurFade>
        </section>

        {/* <AnimatedTitle 
          name="Jasper"
          subtitle="Front-End Developer crafting high-performance, responsive, and user-friendly web applications using modern technologies, clean code, and best practices."
          image={profileImage}
        /> */}
      </main>
    </div>
  );
};

export default Home;
