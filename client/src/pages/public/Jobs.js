import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const allJobs = [
    { id: 1, title: 'Senior React Developer', department: 'Engineering', branch: 'Islamabad', seats: 3, type: 'Full-time', description: 'Build and maintain complex React applications with modern architecture patterns. Work with a team of experienced developers on cutting-edge products.' },
    { id: 2, title: 'UI/UX Designer', department: 'Design', branch: 'Lahore', seats: 2, type: 'Full-time', description: 'Create beautiful and intuitive user interfaces. Conduct user research, wireframing, and prototyping for web and mobile applications.' },
    { id: 3, title: 'Backend Engineer', department: 'Engineering', branch: 'Karachi', seats: 4, type: 'Full-time', description: 'Design and implement scalable backend services using Node.js and Python. Work with databases, APIs, and cloud infrastructure.' },
    { id: 4, title: 'DevOps Engineer', department: 'Infrastructure', branch: 'Remote', seats: 1, type: 'Contract', description: 'Manage CI/CD pipelines, cloud infrastructure, and deployment processes. Experience with AWS, Docker, and Kubernetes required.' },
    { id: 5, title: 'Product Manager', department: 'Product', branch: 'Islamabad', seats: 2, type: 'Full-time', description: 'Define product strategy and roadmap. Work closely with engineering, design, and stakeholders to deliver impactful products.' },
    { id: 6, title: 'QA Engineer', department: 'Quality Assurance', branch: 'Lahore', seats: 3, type: 'Full-time', description: 'Develop and execute test plans. Automate testing processes and ensure software quality across all releases.' },
    { id: 7, title: 'Data Analyst', department: 'Analytics', branch: 'Karachi', seats: 2, type: 'Full-time', description: 'Analyze business data to provide actionable insights. Build dashboards and reports using SQL, Python, and BI tools.' },
    { id: 8, title: 'Mobile Developer', department: 'Engineering', branch: 'Islamabad', seats: 2, type: 'Full-time', description: 'Develop cross-platform mobile applications using React Native. Collaborate with backend teams for API integration.' },
    { id: 9, title: 'Technical Writer', department: 'Documentation', branch: 'Remote', seats: 1, type: 'Part-time', description: 'Create clear and comprehensive technical documentation, API guides, and user manuals for our products.' },
  ];

  const branches = ['All', 'Islamabad', 'Lahore', 'Karachi', 'Remote'];
  const departments = ['All', ...new Set(allJobs.map(j => j.department))];

  const filteredJobs = allJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = selectedBranch === 'All' || job.branch === selectedBranch;
    const matchesDept = selectedDepartment === 'All' || job.department === selectedDepartment;
    return matchesSearch && matchesBranch && matchesDept;
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

      {/* Results Count */}
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
        Showing {filteredJobs.length} of {allJobs.length} openings
      </p>

      {/* Job Cards */}
      <div className="grid-3">
        {filteredJobs.map((job) => (
          <div className="job-card slide-up" key={job.id}>
            <div className="job-header">
              <div>
                <div className="job-title">{job.title}</div>
                <div className="job-company">OpsNex - {job.branch}</div>
              </div>
            </div>
            <div className="job-meta">
              <span className="job-meta-item">{job.branch}</span>
              <span className="job-meta-item">{job.department}</span>
              <span className="job-meta-item">{job.type}</span>
            </div>
            <p className="job-description">{job.description}</p>
            <div className="job-footer">
              <span className="job-seats">{job.seats} seats</span>
              <Link to={`/jobs/${job.id}`} className="btn btn-primary btn-sm">Apply Now</Link>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon"></div>
          <h3>No jobs found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Jobs;

