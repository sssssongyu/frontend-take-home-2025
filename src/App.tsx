import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import Movie from './pages/Movie.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'

function App() {

  return (
    <div className="App bg-white min-h-screen text-black dark:bg-black dark:text-white w-full h-full">
      <BrowserRouter>
        <Nav />
        <div className='pt-30 sm:pt-20'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Movie />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;