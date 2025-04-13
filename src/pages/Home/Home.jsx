import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Welcome to my portfolio</h1>
      <p>This is a test of Framer Motion animations</p>
    </motion.div>
  );
};

export default Home;