import React from 'react';
import { Link, useParams } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();

  // Dummy job data - will be replaced with API call
  const job = {
    id: id,
    title: 'Senior React Developer',
    department: 'Engineering',
    branch: 'Islamabad',
    seats: 3,
    type: 'Full-time',
    description: 'We are looking for an experienced React Developer to join our engineering team in Islamabad. You will be responsible for building and maintaining complex web applications using React.js and related technologies.',
    requirements: [
      '3+ years of experience with React.js',
      'Strong understanding of JavaScript ES6+',
      'Experience with state management (Redux, Context API)',
      'Familiarity with RESTful APIs and Axios',
      'Experience with Git version control',
      'Good communication and teamwork skills',
    ],
    benefits: [
      'Competitive salary package',
      'Health insurance',
      'Flexible working hours',
      'Remote work options',
      'Professional development budget',
      'Annual bonuses',
    ],
    postedDate: '2026-05-10',
    deadline: '2026-06-10',
  };

  return (
    <div className="page-container fade-in">
      <Link to="/jobs" style={{ color: 'var(--primary-light)', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        ← Back to Jobs
      </Link>

      <div className="grid-2" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Job Details */}
        <div>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem' }}>{job.title}</h1>
              <div style={{ color: 'var(--primary-light)', fontWeight: 600, marginBottom: '1rem' }}>OpsNex - {job.branch}</div>
              <div className="job-meta">
                <span className="job-meta-item">{job.branch}</span>
                <span className="job-meta-item">{job.department}</span>
                <span className="job-meta-item">{job.type}</span>
                <span className="job-meta-item">{job.seats} seats available</span>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>{job.description}</p>
          </div>

          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Requirements</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {job.requirements.map((req, i) => (
                <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--success)' }}>✓</span> {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Benefits</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {job.benefits.map((ben, i) => (
                <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--primary-light)' }}>★</span> {ben}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="card" style={{ position: 'sticky', top: '90px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.25rem' }}>Apply for this position</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Posted</span>
                <span>{job.postedDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Deadline</span>
                <span style={{ color: 'var(--warning)' }}>{job.deadline}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Available Seats</span>
                <span style={{ color: 'var(--success)' }}>{job.seats}</span>
              </div>
            </div>
            <Link to="/login" className="btn btn-primary" style={{ width: '100%' }}>
              Apply Now
            </Link>
            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
              You need to <Link to="/login" style={{ color: 'var(--primary-light)' }}>login</Link> to apply
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;

