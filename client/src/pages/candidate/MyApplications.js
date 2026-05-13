import React, { useState } from 'react';

const MyApplications = () => {
  const [filterStatus, setFilterStatus] = useState('All');

  const applications = [
    { id: 1, position: 'Senior React Developer', branch: 'Islamabad', department: 'Engineering', status: 'Shortlisted', date: '2026-05-10', resumeURL: '#' },
    { id: 2, position: 'UI/UX Designer', branch: 'Lahore', department: 'Design', status: 'Under Review', date: '2026-05-08', resumeURL: '#' },
    { id: 3, position: 'Product Manager', branch: 'Islamabad', department: 'Product', status: 'Interview Scheduled', date: '2026-05-05', resumeURL: '#' },
    { id: 4, position: 'Backend Engineer', branch: 'Karachi', department: 'Engineering', status: 'Submitted', date: '2026-05-03', resumeURL: '#' },
    { id: 5, position: 'DevOps Engineer', branch: 'Remote', department: 'Infrastructure', status: 'Rejected', date: '2026-04-28', resumeURL: '#' },
    { id: 6, position: 'QA Engineer', branch: 'Lahore', department: 'Quality Assurance', status: 'Selected', date: '2026-04-20', resumeURL: '#' },
  ];

  const statuses = ['All', 'Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Rejected', 'Selected'];

  const filtered = filterStatus === 'All' ? applications : applications.filter(a => a.status === filterStatus);

  const getStatusBadge = (status) => {
    const map = {
      'Submitted': 'badge-submitted',
      'Under Review': 'badge-review',
      'Shortlisted': 'badge-shortlisted',
      'Interview Scheduled': 'badge-interview',
      'Rejected': 'badge-rejected',
      'Selected': 'badge-selected',
    };
    return map[status] || 'badge-submitted';
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>📄 My Applications</h1>
        <p>Track the status of all your job applications</p>
      </div>

      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {statuses.map(s => (
          <button
            key={s}
            className={`btn btn-sm ${filterStatus === s ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Department</th>
              <th>Branch</th>
              <th>Status</th>
              <th>Applied Date</th>
              <th>Resume</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((app) => (
              <tr key={app.id}>
                <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{app.position}</td>
                <td>{app.department}</td>
                <td><span className="job-meta-item">📍 {app.branch}</span></td>
                <td><span className={`badge ${getStatusBadge(app.status)}`}>{app.status}</span></td>
                <td>{app.date}</td>
                <td><a href={app.resumeURL} className="btn btn-secondary btn-sm" target="_blank" rel="noreferrer">📎 View</a></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No applications with this status</h3>
            <p>Try selecting a different filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
