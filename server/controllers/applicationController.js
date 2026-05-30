// Application controller: applyForJob, getMyApplications, getAllApplications, updateApplicationStatus
const Application = require('../models/Application');
const Job = require('../models/Job');
const { cloudinary } = require('../config/cloudinary');
const { APPLICATION_STATUSES } = require('../models/Application');

// Remove an already-uploaded Cloudinary file (used to roll back on failure).
const cleanupUpload = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
  } catch (err) {
    console.error('Failed to clean up Cloudinary upload:', err.message);
  }
};

// POST /api/applications  (candidate)
// Expects multipart/form-data: field "resume" (file) + "jobId" (text)
const applyForJob = async (req, res) => {
  // multer-storage-cloudinary puts the uploaded file's secure URL on
  // req.file.path and its public_id on req.file.filename.
  const resumeURL = req.file?.path;
  const resumePublicId = req.file?.filename;

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    const { jobId } = req.body;
    if (!jobId) {
      await cleanupUpload(resumePublicId);
      return res.status(400).json({ message: 'jobId is required' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      await cleanupUpload(resumePublicId);
      return res.status(404).json({ message: 'Job not found' });
    }
    if (!job.isOpen) {
      await cleanupUpload(resumePublicId);
      return res.status(400).json({ message: 'This job is no longer accepting applications' });
    }

    const application = await Application.create({
      jobId,
      userId: req.user._id,
      resumeURL,
      resumePublicId,
      coverLetterURL: req.body.coverLetterURL || '',
    });

    return res.status(201).json(application);
  } catch (err) {
    // Roll back the uploaded file so we don't leak storage on failure.
    await cleanupUpload(resumePublicId);

    // Duplicate application (unique index on jobId + userId).
    if (err.code === 11000) {
      return res.status(409).json({ message: 'You have already applied to this job' });
    }
    console.error('applyForJob error:', err);
    return res.status(500).json({ message: 'Failed to submit application' });
  }
};

// GET /api/applications/mine  (candidate)
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user._id })
      .populate('jobId', 'title department branch')
      .sort({ createdAt: -1 });
    return res.json(applications);
  } catch (err) {
    console.error('getMyApplications error:', err);
    return res.status(500).json({ message: 'Failed to load applications' });
  }
};

// GET /api/applications  (hr/admin)
const getAllApplications = async (req, res) => {
  try {
    const filter = {};
    if (req.query.jobId) filter.jobId = req.query.jobId;
    if (req.query.status) filter.status = req.query.status;

    const applications = await Application.find(filter)
      .populate('jobId', 'title department branch')
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });
    return res.json(applications);
  } catch (err) {
    console.error('getAllApplications error:', err);
    return res.status(500).json({ message: 'Failed to load applications' });
  }
};

// PATCH /api/applications/:id/status  (hr/admin)
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!APPLICATION_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Must be one of: ${APPLICATION_STATUSES.join(', ')}`,
      });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    return res.json(application);
  } catch (err) {
    console.error('updateApplicationStatus error:', err);
    return res.status(500).json({ message: 'Failed to update application status' });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
};
