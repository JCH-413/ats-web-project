import React, { useState } from 'react';

const ManageJobs = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '', department: '', branch: 'Islamabad', seats: 1, type: 'Full-time', description: '',
  });

  const jobs = [
    { id: 1, title: 'Senior React Developer', department: 'Engineering', branch: 'Islamabad', seats: 3, type: 'Full-time', isOpen: true, applicants: 12 },
    { id: 2, title: 'UI/UX Designer', department: 'Design', branch: 'Lahore', seats: 2, type: 'Full-time', isOpen: true, applicants: 8 },
    { id: 3, title: 'Backend Engineer', department: 'Engineering', branch: 'Karachi', seats: 4, type: 'Full-time', isOpen: true, applicants: 15 },
    { id: 4, title: 'DevOps Engineer', department: 'Infrastructure', branch: 'Remote', seats: 1, type: 'Contract', isOpen: false, applicants: 6 },
    { id: 5, title: 'Product Manager', department: 'Product', branch: 'Islamabad', seats: 2, type: 'Full-time', isOpen: true, applicants: 10 },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Job creation will be connected to the backend API');
    setShowForm(false);
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <h1>ðŸ’¼ Manage Jobs</h1>
          <p>Create, edit, and manage job postings across branches</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'âœ• Cancel' : 'âž• Post New Job'}
        </button>
      </div>

      {/* New Job Form */}
      {showForm && (
        <div className="card slide-up" style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Create New Job Posting</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label>Job Title</label>
                <input type="text" name="title" className="form-control" placeholder="e.g., Senior React Developer" value={formData.title} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input type="text" name="department" className="form-control" placeholder="e.g., Engineering" value={formData.department} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Branch</label>
                <select name="branch" className="form-control" value={formData.branch} onChange={handleChange}>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div className="form-group">
                <label>Available Seats</label>
                <input type="number" name="seats" className="form-control" min="1" value={formData.seats} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Job Type</label>
                <select name="type" className="form-control" value={formData.type} onChange={handleChange}>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Job Description</label>
              <textarea name="description" className="form-control" rows="4" placeholder="Describe the role, responsibilities, and qualifications..." value={formData.description} onChange={handleChange} style={{ resize: 'vertical' }}></textarea>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-success">âœ“ Publish Job</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Jobs Table */}
      <div className="table-container">
        <div className="table-header">
          <h3>Active Job Postings</h3>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{jobs.length} total</span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Department</th>
              <th>Branch</th>
              <th>Type</th>
              <th>Seats</th>
              <th>Applicants</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{job.title}</td>
                <td>{job.department}</td>
                <td><span className="job-meta-item">ðŸ“ {job.branch}</span></td>
                <td>{job.type}</td>
                <td>{job.seats}</td>
                <td style={{ color: 'var(--primary-light)', fontWeight: 600 }}>{job.applicants}</td>
                <td>
                  <span className={`badge ${job.isOpen ? 'badge-shortlisted' : 'badge-rejected'}`}>
                    {job.isOpen ? 'Open' : 'Closed'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-secondary btn-sm">âœï¸</button>
                    <button className="btn btn-danger btn-sm">ðŸ—‘ï¸</button>
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

export default ManageJobs;
