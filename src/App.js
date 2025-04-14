// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';  // Updated path
import Projects from './pages/Projects';  // Updated path
import Gallery from './pages/Gallery';  // Updated path
import './App.css';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;