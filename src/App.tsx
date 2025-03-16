import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/booking" element={<Booking />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;