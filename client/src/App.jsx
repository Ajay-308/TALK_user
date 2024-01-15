// import { useState } from 'react'; // Uncomment this line if you're using useState
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter as Router
import Login from './compoenents/login'; // Fix the typo in 'compoenents'
import Home from "./pages/Home"

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Login} />
        <Route path='/home' Component={Home} />

      </Routes>

    </Router>
  );
}

export default App;
