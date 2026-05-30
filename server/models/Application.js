// Application model
// Fields: jobId (ref), userId (ref), status, resumeURL, coverLetterURL, appliedAt
// Statuses: Submitted, Under Review, Shortlisted, Interview Scheduled, Rejected, Selected
const mongoose = require('mongoose');

const APPLICATION_STATUSES = [
  'Submitted',
  'Under Review',
  'Shortlisted',
  'Interview Scheduled',
  'Rejected',
  'Selected',
];

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: APPLICATION_STATUSES,
      default: 'Submitted',
    },
    resumeURL: {
      type: String,
      required: [true, 'Resume is required'],
    },
    // Cloudinary public_id — kept so the file can be deleted when the
    // application is removed or the resume is replaced.
    resumePublicId: {
      type: String,
      default: '',
    },
    coverLetterURL: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// A candidate can only apply to a given job once.
applicationSchema.index({ jobId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
module.exports.APPLICATION_STATUSES = APPLICATION_STATUSES;
