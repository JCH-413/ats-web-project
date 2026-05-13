import React, { useState } from 'react';

const ManageApplicants = () => {
  const [filterStatus, setFilterStatus] = useState('All');

  const applicants = [
    { id: 1, name: 'Ahmed Khan', email: 'ahmed@email.com', position: 'Senior React Developer', branch: 'Islamabad', status: 'Submitted', date: '2026-05-13', resumeURL: '#' },
    { id: 2, name: 'Sara Ali', email: 'sara@email.com', position: 'UI/UX Designer', branch: 'Lahore', status: 'Under Review', date: '2026-05-12', resumeURL: '#' },
    { id: 3, name: 'Bilal Hussain', email: 'bilal@email.com', position: 'Backend Engineer', branch: 'Karachi', status: 'Shortlisted', date: '2026-05-12', resumeURL: '#' },
    { id: 4, name: 'Fatima Zahra', email: 'fatima@email.com', position: 'DevOps Engineer', branch: 'Remote', status: 'Interview Scheduled', date: '2026-05-11', resumeURL: '#' },
    { id: 5, name: 'Usman Tariq', email: 'usman@email.com', position: 'Product Manager', branch: 'Islamabad', status: 'Rejected', date: '2026-05-10', resumeURL: '#' },
    { id: 6, name: 'Ayesha Malik', email: 'ayesha@email.com', position: 'QA Engineer', branch: 'Lahore', status: 'Selected', date: '2026-05-09', resumeURL: '#' },
    { id: 7, name: 'Hassan Raza', email: 'hassan@email.com', position: 'Data Analyst', branch: 'Karachi', status: 'Under Review', date: '2026-05-08', resumeURL: '#' },
    { id: 8, name: 'Zainab Noor', email: 'zainab@email.com', position: 'Mobile Developer', branch: 'Islamabad', status: 'Submitted', date: '2026-05-07', resumeURL: '#' },
  ];

  const statuses = ['All', 'Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Rejected', 'Selected'];
  const filtered = filterStatus === 'All' ? applicants : applicants.filter(a => a.status === filterStatus);

  const getStatusBadge = (status) => {
    const map = {
      'Submitted': 'badge-submitted', 'Under Review': 'badge-review', 'Shortlisted': 'badge-shortlisted',
      'Interview Scheduled': 'badge-interview', 'Rejected': 'badge-rejected', 'Selected': 'badge-selected',
    };
    return map[status] || 'badge-submitted';
  };

  const handleStatusChange = (id, newStatus) => {
    alert(`Status update to "${newStatus}" will be connected to the backend API`);
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>👥 Manage Applicants</h1>
        <p>Review, shortlist, and manage all candidate applications</p>
      </div>

      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {statuses.map(s => (
          <button key={s} className={`btn btn-sm ${filterStatus === s ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilterStatus(s)}>
            {s} {s !== 'All' && `(${applicants.filter(a => a.status === s).length})`}
          </button>
        ))}
      </div>

      <div className="table-container">
        <div className="table-header">
          <h3>Applications ({filtered.length})</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Position</th>
              <th>Branch</th>
              <th>Status</th>
              <th>Applied</th>
              <th>Resume</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((app) => (
              <tr key={app.id}>
                <td>
                  <div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{app.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{app.email}</div>
                  </div>
                </td>
                <td>{app.position}</td>
                <td><span className="job-meta-item">📍 {app.branch}</span></td>
                <td><span className={`badge ${getStatusBadge(app.status)}`}>{app.status}</span></td>
                <td>{app.date}</td>
                <td><a href={app.resumeURL} className="btn btn-secondary btn-sm" target="_blank" rel="noreferrer">📎 View</a></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-success btn-sm" onClick={() => handleStatusChange(app.id, 'Shortlisted')}>✓</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleStatusChange(app.id, 'Rejected')}>✕</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => handleStatusChange(app.id, 'Interview Scheduled')}>📅</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageApplicants;
