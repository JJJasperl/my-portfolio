// src/pages/Gallery.jsx
import React from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground/ParticleBackground';

const Gallery = () => {
  return (
    <div className="gallery-container">
      <ParticleBackground />
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        My Gallery
      </motion.h1>
      <p>This page is under construction</p>
    </div>
  );
};

export default Gallery;