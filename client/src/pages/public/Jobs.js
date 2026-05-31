import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [jobs, setJobs] = useState([]);
  const [branches, setBranches] = useState(['All', 'Islamabad', 'Lahore', 'Karachi', 'Remote']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobsAndBranches = async () => {
      try {
        const [jobsRes, branchesRes] = await Promise.allSettled([
          api.get('/jobs'),
          api.get('/branches')
        ]);

        if (jobsRes.status === 'fulfilled') {
          setJobs(Array.isArray(jobsRes.value.data) ? jobsRes.value.data : []);
        } else {
          console.error('Failed to fetch jobs:', jobsRes.reason);
          setError('Failed to load job listings.');
        }

        if (branchesRes.status === 'fulfilled' && Array.isArray(branchesRes.value.data)) {
          const names = branchesRes.value.data.map(b => b.name || b);
          setBranches(['All', ...names]);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobsAndBranches();
  }, []);

  const departments = ['All', ...new Set(jobs.map(j => j.department).filter(Boolean))];

  const filteredJobs = jobs.filter(job => {
    const jobBranchName = job.branch?.name || job.branch || '';
    const jobDept = job.department || '';
    const jobTitle = job.title || '';

    const matchesSearch = jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          jobDept.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = selectedBranch === 'All' || 
                          jobBranchName.toLowerCase() === selectedBranch.toLowerCase();
    const matchesDept = selectedDepartment === 'All' || 
                        jobDept.toLowerCase() === selectedDepartment.toLowerCase();

    return matchesSearch && matchesBranch && matchesDept && job.isOpen !== false;
  });

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>Browse Openings</h1>
        <p>Find your next opportunity at OpsNex across our offices in Pakistan</p>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'end' }}>
          <div className="form-group" style={{ flex: '1', minWidth: '200px', marginBottom: 0 }}>
            <label>Search</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search by title or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ minWidth: '160px', marginBottom: 0 }}>
            <label>Branch</label>
            <select className="form-control" value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
              {branches.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="form-group" style={{ minWidth: '160px', marginBottom: 0 }}>
            <label>Department</label>
            <select className="form-control" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
          <p>Loading openings...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--danger)' }}>
          <p>{error}</p>
        </div>
      ) : (
        <>
          {/* Results Count */}
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
            Showing {filteredJobs.length} of {jobs.length} openings
          </p>

          {/* Job Cards */}
          <div className="grid-3">
            {filteredJobs.map((job) => (
              <div className="job-card slide-up" key={job._id || job.id}>
                <div className="job-header">
                  <div>
                    <div className="job-title">{job.title}</div>
                    <div className="job-company">OpsNex - {job.branch?.name || job.branch || 'Remote'}</div>
                  </div>
                </div>
                <div className="job-meta">
                  <span className="job-meta-item">📍 {job.branch?.name || job.branch || 'Remote'}</span>
                  <span className="job-meta-item">🏢 {job.department}</span>
                  <span className="job-meta-item">💼 {job.type || 'Full-time'}</span>
                </div>
                <p className="job-description">{job.description}</p>
                <div className="job-footer">
                  <span className="job-seats">🟢 {job.seats || 1} seats</span>
                  <Link to={`/jobs/${job._id || job.id}`} className="btn btn-primary btn-sm">Apply Now</Link>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="empty-state card">
              <h3>No jobs found</h3>
              <p>Try adjusting your search or filters, or check back later!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Jobs;

