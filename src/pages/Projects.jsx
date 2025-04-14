// src/pages/Projects.jsx
import React from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground/ParticleBackground';

const Projects = () => {
  return (
    <div className="projects-container">
      <ParticleBackground />
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        My Projects
      </motion.h1>
      <p>This page is under construction</p>
    </div>
  );
};

export default Projects;