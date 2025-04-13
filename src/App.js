import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Import your pages
import Home from './pages/Home/Home';
// import Projects from './pages/Projects/Projects';
// import Gallery from './pages/Gallery/Gallery';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/projects" element={<Projects />} />
          <Route path="/gallery" element={<Gallery />} /> */}
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;