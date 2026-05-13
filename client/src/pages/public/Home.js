import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const featuredJobs = [
    { id: 1, title: 'Senior React Developer', department: 'Engineering', branch: 'Islamabad', seats: 3, type: 'Full-time' },
    { id: 2, title: 'UI/UX Designer', department: 'Design', branch: 'Lahore', seats: 2, type: 'Full-time' },
    { id: 3, title: 'Backend Engineer', department: 'Engineering', branch: 'Karachi', seats: 4, type: 'Full-time' },
    { id: 4, title: 'DevOps Engineer', department: 'Infrastructure', branch: 'Remote', seats: 1, type: 'Contract' },
    { id: 5, title: 'Product Manager', department: 'Product', branch: 'Islamabad', seats: 2, type: 'Full-time' },
    { id: 6, title: 'QA Engineer', department: 'Quality Assurance', branch: 'Lahore', seats: 3, type: 'Full-time' },
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Build Your Future at <span className="gradient-text">OpsNex</span>
          </h1>
          <p>
            Join a leading software house with offices across Pakistan. 
            Explore opportunities in Islamabad, Lahore, Karachi, and Remote — 
            find the role that matches your skills and ambitions.
          </p>
          <div className="hero-buttons">
            <Link to="/jobs" className="btn btn-primary btn-lg">
              🔍 Browse Openings
            </Link>
            <Link to="/register" className="btn btn-secondary btn-lg">
              📄 Create Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <div className="page-container">
        <div className="section-header">
          <h2>🔥 Featured Openings</h2>
          <Link to="/jobs" className="btn btn-secondary btn-sm">View All →</Link>
        </div>

        <div className="grid-3">
          {featuredJobs.map((job) => (
            <div className="job-card slide-up" key={job.id}>
              <div className="job-header">
                <div>
                  <div className="job-title">{job.title}</div>
                  <div className="job-company">OpsNex — {job.branch}</div>
                </div>
              </div>
              <div className="job-meta">
                <span className="job-meta-item">📍 {job.branch}</span>
                <span className="job-meta-item">🏢 {job.department}</span>
                <span className="job-meta-item">💼 {job.type}</span>
              </div>
              <p className="job-description">
                We are looking for talented professionals to join our growing team. 
                Work on cutting-edge projects with a collaborative and innovative environment.
              </p>
              <div className="job-footer">
                <span className="job-seats">🟢 {job.seats} seats available</span>
                <Link to={`/jobs/${job.id}`} className="btn btn-primary btn-sm">Apply Now</Link>
              </div>
            </div>
          ))}
        </div>

        {/* Branch Locations */}
        <div className="dashboard-section" style={{ marginTop: '3rem' }}>
          <div className="section-header">
            <h2>🌍 Our Branches</h2>
          </div>
          <div className="stats-grid">
            <div className="stat-card purple">
              <div className="stat-icon">🏛️</div>
              <div className="stat-value">Islamabad</div>
              <div className="stat-label">Head Office — Blue Area</div>
            </div>
            <div className="stat-card teal">
              <div className="stat-icon">🏙️</div>
              <div className="stat-value">Lahore</div>
              <div className="stat-label">Johar Town Tech Hub</div>
            </div>
            <div className="stat-card pink">
              <div className="stat-icon">🌊</div>
              <div className="stat-value">Karachi</div>
              <div className="stat-label">Clifton Business Center</div>
            </div>
            <div className="stat-card yellow">
              <div className="stat-icon">🌐</div>
              <div className="stat-value">Remote</div>
              <div className="stat-label">Work From Anywhere</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
