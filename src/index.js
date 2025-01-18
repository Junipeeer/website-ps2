import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Portfolio from './pages/Portfolio';
import Links from './pages/Links';
import './index.css';
import reportWebVitals from './components/reportWebVitals';
import { AnimatePresence } from 'framer-motion'

function App() {
  const location = useLocation();
  
  return (
    <>
      <Navigation />
      <AnimatePresence mode={"wait"} initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/links" element={<Links />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();