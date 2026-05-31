import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const Home = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        const { data } = await api.get('/jobs');
        // Filter only open jobs and show the first 6
        const openJobs = Array.isArray(data) 
          ? data.filter(job => job.isOpen !== false) 
          : [];
        setFeaturedJobs(openJobs.slice(0, 6));
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to fetch latest job openings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedJobs();
  }, []);

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
              Browse Openings
            </Link>
            <Link to="/register" className="btn btn-secondary btn-lg">
              Create Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <div className="page-container">
        <div className="section-header">
          <h2>Featured Openings</h2>
          <Link to="/jobs" className="btn btn-secondary btn-sm">View All →</Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            <p>Loading open positions...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--danger)' }}>
            <p>{error}</p>
          </div>
        ) : featuredJobs.length === 0 ? (
          <div className="empty-state card">
            <h3>No featured openings at the moment</h3>
            <p>We don't have any active job posts right now. Check back soon or create a profile to stay updated!</p>
            <Link to="/jobs" className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }}>Browse All Jobs</Link>
          </div>
        ) : (
          <div className="grid-3">
            {featuredJobs.map((job) => (
              <div className="job-card slide-up" key={job._id || job.id}>
                <div className="job-header">
                  <div>
                    <div className="job-title">{job.title}</div>
                    <div className="job-company">OpsNex — {job.branch?.name || job.branch || 'Multiple Locations'}</div>
                  </div>
                </div>
                <div className="job-meta">
                  <span className="job-meta-item">{job.branch?.name || job.branch || 'Remote'}</span>
                  <span className="job-meta-item">{job.department}</span>
                  <span className="job-meta-item">{job.type || 'Full-time'}</span>
                </div>
                <p className="job-description">
                  {job.description || 'We are looking for talented professionals to join our growing team. Work on cutting-edge projects with a collaborative and innovative environment.'}
                </p>
                <div className="job-footer">
                  <span className="job-seats">{job.seats || 1} seats available</span>
                  <Link to={`/jobs/${job._id || job.id}`} className="btn btn-primary btn-sm">Apply Now</Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Branch Locations */}
        <div className="dashboard-section" style={{ marginTop: '3rem' }}>
          <div className="section-header">
            <h2>Our Branches</h2>
          </div>
          <div className="stats-grid">
            <div className="stat-card purple">
              <div className="stat-value" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Islamabad</div>
              <div className="stat-label">Head Office — Blue Area</div>
            </div>
            <div className="stat-card teal">
              <div className="stat-value" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Lahore</div>
              <div className="stat-label">Johar Town Tech Hub</div>
            </div>
            <div className="stat-card pink">
              <div className="stat-value" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Karachi</div>
              <div className="stat-label">Clifton Business Center</div>
            </div>
            <div className="stat-card yellow">
              <div className="stat-value" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Remote</div>
              <div className="stat-label">Work From Anywhere</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
