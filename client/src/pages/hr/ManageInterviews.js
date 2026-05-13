import React, { useState } from 'react';

const ManageInterviews = () => {
  const [showForm, setShowForm] = useState(false);

  const interviews = [
    { id: 1, candidate: 'Fatima Zahra', position: 'DevOps Engineer', branch: 'Remote', date: '2026-05-15', time: '10:00 AM', status: 'Scheduled' },
    { id: 2, candidate: 'Bilal Hussain', position: 'Backend Engineer', branch: 'Karachi', date: '2026-05-16', time: '2:00 PM', status: 'Scheduled' },
    { id: 3, candidate: 'Ahmed Khan', position: 'Senior React Developer', branch: 'Islamabad', date: '2026-05-17', time: '11:00 AM', status: 'Scheduled' },
    { id: 4, candidate: 'Sara Ali', position: 'UI/UX Designer', branch: 'Lahore', date: '2026-05-14', time: '3:00 PM', status: 'Completed' },
    { id: 5, candidate: 'Hassan Raza', position: 'Data Analyst', branch: 'Karachi', date: '2026-05-13', time: '10:30 AM', status: 'Completed' },
  ];

  return (
    <div className="page-container fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <h1>📅 Manage Interviews</h1>
          <p>Schedule and track candidate interviews</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '➕ Schedule Interview'}
        </button>
      </div>

      {showForm && (
        <div className="card slide-up" style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Schedule New Interview</h3>
          <form onSubmit={(e) => { e.preventDefault(); alert('Interview scheduling will be connected to the backend API'); setShowForm(false); }}>
            <div className="grid-2">
              <div className="form-group">
                <label>Candidate</label>
                <select className="form-control">
                  <option value="">Select candidate...</option>
                  <option>Ahmed Khan — Senior React Developer</option>
                  <option>Sara Ali — UI/UX Designer</option>
                  <option>Bilal Hussain — Backend Engineer</option>
                </select>
              </div>
              <div className="form-group">
                <label>Interview Date</label>
                <input type="date" className="form-control" />
              </div>
              <div className="form-group">
                <label>Interview Time</label>
                <input type="time" className="form-control" />
              </div>
              <div className="form-group">
                <label>Interview Type</label>
                <select className="form-control">
                  <option value="online">Online (Video Call)</option>
                  <option value="onsite">On-site</option>
                  <option value="phone">Phone Screen</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Message to Candidate</label>
              <textarea className="form-control" rows="3" placeholder="Add any instructions or details for the interview..." style={{ resize: 'vertical' }}></textarea>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-success">✓ Schedule & Send Email</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <div className="table-header">
          <h3>All Interviews</h3>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{interviews.length} total</span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Position</th>
              <th>Branch</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview) => (
              <tr key={interview.id}>
                <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{interview.candidate}</td>
                <td>{interview.position}</td>
                <td><span className="job-meta-item">📍 {interview.branch}</span></td>
                <td>{interview.date}</td>
                <td>{interview.time}</td>
                <td>
                  <span className={`badge ${interview.status === 'Scheduled' ? 'badge-interview' : 'badge-shortlisted'}`}>
                    {interview.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-secondary btn-sm">✏️ Edit</button>
                    <button className="btn btn-danger btn-sm">🗑️</button>
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

export default ManageInterviews;
