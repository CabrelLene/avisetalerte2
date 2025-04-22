import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AlertDetail from './pages/AlertDetail';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/alerte/:id" element={<AlertDetail />} />
      </Routes>
    </Router>
  );
}

export default App;