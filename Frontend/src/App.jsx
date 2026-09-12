import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorList from './pages/DoctorList';
import Dashboard from './pages/Dashboard';
import DoctorProfile from './pages/DoctorProfile';

function Navigation() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <span className="logo-dot">+</span>
        MediBook
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Doctors</Link>
        {token ? (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            {user.role === 'doctor' && (
              <Link to="/doctor-profile" className="nav-link">My Profile</Link>
            )}
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="btn-primary-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<DoctorList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
