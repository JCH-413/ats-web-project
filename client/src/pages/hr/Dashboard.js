import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const HRDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [jobsRes, appsRes, interviewsRes] = await Promise.allSettled([
          api.get('/jobs'),
          api.get('/applications'),
          api.get('/interviews')
        ]);

        if (jobsRes.status === 'fulfilled') {
          setJobs(Array.isArray(jobsRes.value.data) ? jobsRes.value.data : []);
        }
        if (appsRes.status === 'fulfilled') {
          setApplications(Array.isArray(appsRes.value.data) ? appsRes.value.data : []);
        }
        if (interviewsRes.status === 'fulfilled') {
          setInterviews(Array.isArray(interviewsRes.value.data) ? interviewsRes.value.data : []);
        }
      } catch (err) {
        console.error('Error fetching HR dashboard data:', err);
        setError('Failed to fetch pipeline overview data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalJobs = jobs.length;
  const totalApplicants = applications.length;
  const totalInterviews = interviews.length || applications.filter(a => a.status === 'Interview Scheduled').length;
  const positionsFilled = applications.filter(a => a.status === 'Selected').length;

  const stats = [
    { label: 'Total Jobs', value: totalJobs, change: 'Active posts', direction: 'up', color: 'purple', icon: '💼' },
    { label: 'Total Applicants', value: totalApplicants, change: 'In pipeline', direction: 'up', color: 'teal', icon: '👥' },
    { label: 'Interviews Scheduled', value: totalInterviews, change: 'Upcoming', direction: 'up', color: 'pink', icon: '📅' },
    { label: 'Positions Filled', value: positionsFilled, change: 'Hired count', direction: 'up', color: 'yellow', icon: '✅' },
  ];

  const recentApplications = applications.slice(0, 6);

  // Generate dynamic activities based on recent applications and jobs
  const recentActivity = [];
  if (applications.length > 0) {
    applications.slice(0, 3).forEach(app => {
      recentActivity.push({
        text: `${app.userId?.name || 'A candidate'} applied for ${app.jobId?.title || 'a position'}`,
        time: app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'Recent',
        color: 'teal'
      });
    });
  }
  if (jobs.length > 0) {
    jobs.slice(0, 2).forEach(job => {
      recentActivity.push({
        text: `New job posted: ${job.title} — ${job.branch?.name || job.branch || 'Remote'}`,
        time: job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recent',
        color: 'purple'
      });
    });
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      'Submitted': 'badge-submitted',
      'Under Review': 'badge-review',
      'Shortlisted': 'badge-shortlisted',
      'Interview Scheduled': 'badge-interview',
      'Rejected': 'badge-rejected',
      'Selected': 'badge-selected',
    };
    return statusMap[status] || 'badge-submitted';
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>HR Dashboard</h1>
        <p>Welcome back! Here's an overview of your recruitment pipeline.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
          <p>Loading overview metrics...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--danger)' }}>
          <p>{error}</p>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div className={`stat-card ${stat.color}`} key={i}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-change up" style={{ background: 'transparent', padding: 0, marginTop: '0.25rem' }}>
                  {stat.change}
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid-2">
            {/* Recent Applications Table */}
            <div className="table-container" style={{ gridColumn: 'span 2' }}>
              <div className="table-header">
                <h3>📋 Recent Applications</h3>
                <Link to="/hr/applicants" className="btn btn-secondary btn-sm">View All →</Link>
              </div>

              {recentApplications.length === 0 ? (
                <div className="empty-state" style={{ padding: '3rem 1rem' }}>
                  <p>No job applications have been submitted yet.</p>
                </div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Candidate</th>
                      <th>Position</th>
                      <th>Branch</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentApplications.map((app) => {
                      const candidateName = app.userId?.name || 'Anonymous';
                      const positionTitle = app.jobId?.title || 'Unknown Role';
                      const branchName = app.jobId?.branch?.name || app.jobId?.branch || 'Remote';
                      const dateString = app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A';

                      return (
                        <tr key={app._id || app.id}>
                          <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{candidateName}</td>
                          <td>{positionTitle}</td>
                          <td>
                            <span className="job-meta-item">📍 {branchName}</span>
                          </td>
                          <td>
                            <span className={`badge ${getStatusBadge(app.status)}`}>{app.status}</span>
                          </td>
                          <td>{dateString}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid-2" style={{ marginTop: '1.5rem' }}>
            {/* Recent Activity */}
            <div className="activity-feed">
              <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>⚡ Recent Activity</h3>
              
              {recentActivity.length === 0 ? (
                <div style={{ padding: '1rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  No recent activities recorded.
                </div>
              ) : (
                recentActivity.map((item, i) => (
                  <div className="activity-item" key={i}>
                    <div className={`activity-dot ${item.color}`}></div>
                    <div className="activity-content">
                      <p>{item.text}</p>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 style={{ marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 600 }}>🚀 Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link to="/hr/jobs" className="btn btn-primary" style={{ justifyContent: 'flex-start' }}>
                  ➕ Post New Job
                </Link>
                <Link to="/hr/applicants" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                  👥 Review Applicants
                </Link>
                <Link to="/hr/interviews" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                  📅 Schedule Interview
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HRDashboard;
