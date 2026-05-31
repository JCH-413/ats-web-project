import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const JobDetail = () => {
  const { id } = useParams();
  const { isLoggedIn, role } = useAuth();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Application submission states
  const [resume, setResume] = useState(null);
  const [applying, setApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyError, setApplyError] = useState('');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const { data } = await api.get(`/jobs/${id}`);
        setJob(data);
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to load job details. The job posting might have expired or does not exist.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!resume) {
      setApplyError('Please select a resume file (PDF only).');
      return;
    }
    
    setApplying(true);
    setApplyError('');
    setApplySuccess(false);

    try {
      const formData = new FormData();
      formData.append('jobId', id);
      formData.append('resume', resume);

      await api.post('/applications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setApplySuccess(true);
      setResume(null);
    } catch (err) {
      console.error('Error submitting application:', err);
      setApplyError(err.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container fade-in" style={{ textAlign: 'center', padding: '5rem 0' }}>
        <p>Loading job details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="page-container fade-in">
        <Link to="/jobs" style={{ color: 'var(--primary)', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          ← Back to Jobs
        </Link>
        <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--danger)' }}>
          <h3>Error</h3>
          <p>{error || 'Job not found'}</p>
        </div>
      </div>
    );
  }

  const jobBranchName = job.branch?.name || job.branch || 'Remote';

  return (
    <div className="page-container fade-in">
      <Link to="/jobs" style={{ color: 'var(--primary)', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        ← Back to Jobs
      </Link>

      <div className="grid-2" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Job Details */}
        <div>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem' }}>{job.title}</h1>
              <div style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>OpsNex - {jobBranchName}</div>
              <div className="job-meta">
                <span className="job-meta-item">{jobBranchName}</span>
                <span className="job-meta-item">{job.department}</span>
                <span className="job-meta-item">{job.type || 'Full-time'}</span>
                <span className="job-meta-item">{job.seats || 1} seats available</span>
              </div>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', marginTop: '1.5rem' }}>Job Description</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem', whiteSpace: 'pre-line' }}>{job.description}</p>
          </div>

          {job.requirements && job.requirements.length > 0 && (
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Requirements</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {job.requirements.map((req, i) => (
                  <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--success)' }}>•</span> {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.benefits && job.benefits.length > 0 && (
            <div className="card">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Benefits</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {job.benefits.map((ben, i) => (
                  <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--primary)' }}>•</span> {ben}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="card" style={{ position: 'sticky', top: '90px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.25rem' }}>Apply for this position</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Location</span>
                <span>{jobBranchName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Job Type</span>
                <span>{job.type || 'Full-time'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Available Seats</span>
                <span style={{ color: 'var(--success)' }}>{job.seats || 1}</span>
              </div>
            </div>

            {applySuccess && (
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', marginBottom: '1rem', color: 'var(--success)', fontSize: '0.85rem', textAlign: 'center' }}>
                Application submitted successfully!
              </div>
            )}

            {applyError && (
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', marginBottom: '1rem', color: 'var(--danger)', fontSize: '0.85rem' }}>
                {applyError}
              </div>
            )}

            {!isLoggedIn ? (
              <>
                <Link to="/login" className="btn btn-primary" style={{ width: '100%' }}>
                  Apply Now
                </Link>
                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                  You need to <Link to="/login" style={{ color: 'var(--primary)' }}>login</Link> as a candidate to apply
                </p>
              </>
            ) : role === 'candidate' ? (
              <form onSubmit={handleApply}>
                <div className="form-group">
                  <label htmlFor="resume-file" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem' }}>Upload Resume (PDF only)</label>
                  <input 
                    type="file" 
                    id="resume-file" 
                    accept=".pdf" 
                    className="form-control" 
                    onChange={handleFileChange}
                    style={{ padding: '0.5rem' }}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={applying || applySuccess}>
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                You are logged in as an <strong>{role.toUpperCase()}</strong>. Only candidates can apply for jobs.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;

