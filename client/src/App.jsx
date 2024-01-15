import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './compoenents/login'; // Correct the typo
import Home from './pages/Home';
import Register from './compoenents/Register'; // Correct the typo

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
