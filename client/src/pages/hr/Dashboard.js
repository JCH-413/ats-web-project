import React from 'react';
import { Link } from 'react-router-dom';

const HRDashboard = () => {
  // Dummy data for now — will be replaced with API calls
  const stats = [
    { label: 'Total Jobs', value: '24', change: '+3 this week', direction: 'up', color: 'purple', icon: '💼' },
    { label: 'Total Applicants', value: '156', change: '+18 this week', direction: 'up', color: 'teal', icon: '👥' },
    { label: 'Interviews Scheduled', value: '12', change: '+5 this week', direction: 'up', color: 'pink', icon: '📅' },
    { label: 'Positions Filled', value: '8', change: '33% fill rate', direction: 'up', color: 'yellow', icon: '✅' },
  ];

  const recentApplications = [
    { id: 1, name: 'Ahmed Khan', position: 'Senior React Developer', branch: 'Islamabad', status: 'Submitted', date: '2026-05-13' },
    { id: 2, name: 'Sara Ali', position: 'UI/UX Designer', branch: 'Lahore', status: 'Under Review', date: '2026-05-12' },
    { id: 3, name: 'Bilal Hussain', position: 'Backend Engineer', branch: 'Karachi', status: 'Shortlisted', date: '2026-05-12' },
    { id: 4, name: 'Fatima Zahra', position: 'DevOps Engineer', branch: 'Remote', status: 'Interview Scheduled', date: '2026-05-11' },
    { id: 5, name: 'Usman Tariq', position: 'Product Manager', branch: 'Islamabad', status: 'Rejected', date: '2026-05-10' },
    { id: 6, name: 'Ayesha Malik', position: 'QA Engineer', branch: 'Lahore', status: 'Selected', date: '2026-05-09' },
  ];

  const recentActivity = [
    { text: 'Ahmed Khan applied for Senior React Developer', time: '10 minutes ago', color: 'purple' },
    { text: 'Sara Ali\'s application moved to Under Review', time: '1 hour ago', color: 'teal' },
    { text: 'Interview scheduled with Fatima Zahra', time: '3 hours ago', color: 'pink' },
    { text: 'New job posted: Product Manager — Islamabad', time: '5 hours ago', color: 'yellow' },
    { text: 'Bilal Hussain shortlisted for Backend Engineer', time: '1 day ago', color: 'teal' },
  ];

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

      {/* Stats */}
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div className={`stat-card ${stat.color}`} key={i}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className={`stat-change ${stat.direction}`}>
              {stat.direction === 'up' ? '↑' : '↓'} {stat.change}
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
          <table className="table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Position</th>
                <th>Branch</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map((app) => (
                <tr key={app.id}>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{app.name}</td>
                  <td>{app.position}</td>
                  <td>
                    <span className="job-meta-item">📍 {app.branch}</span>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(app.status)}`}>{app.status}</span>
                  </td>
                  <td>{app.date}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-secondary btn-sm">View</button>
                      <button className="btn btn-primary btn-sm">Update</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid-2" style={{ marginTop: '1.5rem' }}>
        {/* Recent Activity */}
        <div className="activity-feed">
          <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>⚡ Recent Activity</h3>
          {recentActivity.map((item, i) => (
            <div className="activity-item" key={i}>
              <div className={`activity-dot ${item.color}`}></div>
              <div className="activity-content">
                <p>{item.text}</p>
                <span>{item.time}</span>
              </div>
            </div>
          ))}
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
            <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
              📧 Send Bulk Email
            </button>
            <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
              📊 Export Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
