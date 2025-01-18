import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Private from './pages/Private';
import Blog from './pages/Blog';
import Portfolio from './pages/Portfolio';
import Links from './pages/Links';
import Navigation from './components/Navigation';
import reportWebVitals from './components/reportWebVitals';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Private />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/links" element={<Links />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();