import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  // TODO: Replace with actual auth state from AuthContext
  const isLoggedIn = false;
  const userRole = null; // 'candidate', 'hr', or 'admin'

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <div className="logo-icon">ON</div>
        <span>OpsNex</span>
      </Link>

      <div className="navbar-links">
        <Link to="/" className={isActive('/')}>Home</Link>
        <Link to="/jobs" className={isActive('/jobs')}>Jobs</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/login" className={isActive('/login')}>Login</Link>
            <Link to="/register" className={`btn-nav-primary ${isActive('/register')}`}>Sign Up</Link>
          </>
        ) : userRole === 'candidate' ? (
          <>
            <Link to="/candidate/dashboard" className={isActive('/candidate/dashboard')}>Dashboard</Link>
            <Link to="/candidate/applications" className={isActive('/candidate/applications')}>My Applications</Link>
            <Link to="/candidate/profile" className={isActive('/candidate/profile')}>Profile</Link>
            <button onClick={() => alert('Logout functionality coming soon')}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/hr/dashboard" className={isActive('/hr/dashboard')}>Dashboard</Link>
            <Link to="/hr/jobs" className={isActive('/hr/jobs')}>Manage Jobs</Link>
            <Link to="/hr/applicants" className={isActive('/hr/applicants')}>Applicants</Link>
            <Link to="/hr/interviews" className={isActive('/hr/interviews')}>Interviews</Link>
            <button onClick={() => alert('Logout functionality coming soon')}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
