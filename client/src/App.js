import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Public Pages
import Home from './pages/public/Home';
import Jobs from './pages/public/Jobs';
import JobDetail from './pages/public/JobDetail';

// Auth Pages
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';

// Candidate Pages
// import CandidateDashboard from './pages/candidate/Dashboard';
// import MyApplications from './pages/candidate/MyApplications';
// import Profile from './pages/candidate/Profile';

// HR Pages
import HRDashboard from './pages/hr/Dashboard';
// import ManageJobs from './pages/hr/ManageJobs';
// import ManageApplicants from './pages/hr/ManageApplicants';
// import ManageInterviews from './pages/hr/ManageInterviews';

import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            {/* <Route path="/jobs" element={<Jobs />} /> */}
            {/* <Route path="/jobs/:id" element={<JobDetail />} /> */}

            {/* Auth Routes */}
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/register" element={<Register />} /> */}

            {/* Candidate Routes */}
            {/* <Route path="/candidate/dashboard" element={<CandidateDashboard />} /> */}
            {/* <Route path="/candidate/applications" element={<MyApplications />} /> */}
            {/* <Route path="/candidate/profile" element={<Profile />} /> */}

            {/* HR/Admin Routes */}
            <Route path="/hr/dashboard" element={<HRDashboard />} />
            {/* <Route path="/hr/jobs" element={<ManageJobs />} /> */}
            {/* <Route path="/hr/applicants" element={<ManageApplicants />} /> */}
            {/* <Route path="/hr/interviews" element={<ManageInterviews />} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
