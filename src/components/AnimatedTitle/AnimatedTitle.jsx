// src/components/AnimatedTitle/AnimatedTitle.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { HyperText } from "../magicui/hyper-text";
import { TextReveal } from "../magicui/text-reveal";
import './AnimatedTitle.css';

const AnimatedTitle = ({ name, subtitle, image }) => {
  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };
  
  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: 0.3, 
        duration: 0.8 
      }
    }
  };
  
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: 0.5, 
        duration: 0.8, 
        type: "spring", 
        stiffness: 100 
      }
    }
  };
  
  const waveVariants = {
    animate: {
      rotate: [0, 20, 0],
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1.5
      }
    }
  };
  
  return (
    <div className="animated-title-container">
      <div className="title-content">
        <motion.h1 
          className="main-title"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <HyperText>{`Hi, I'm ${name || "default name"}!`}</HyperText>
          <motion.span 
            className="wave" 
            variants={waveVariants}
            animate="animate"
          >
            👋
          </motion.span>
        </motion.h1>
        
        <motion.p 
          className="subtitle"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          <TextReveal>{subtitle}</TextReveal>
        </motion.p>
      </div>
      
      {image && (
        <motion.div 
          className="profile-image-container"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <img src={image} alt="Profile" className="profile-image" />
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedTitle;