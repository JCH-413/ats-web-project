// Application routes: POST / (candidate), GET /mine (candidate), GET / (HR), PATCH /:id/status (HR)
const express = require('express');
const router = express.Router();

const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');
const {
  applyForJob,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
} = require('../controllers/applicationController');

// Candidate: apply to a job with a resume file (multipart field "resume").
router.post('/', protect, authorize('candidate'), upload.single('resume'), applyForJob);

// Candidate: list own applications.
router.get('/mine', protect, authorize('candidate'), getMyApplications);

// HR/Admin: list all applications.
router.get('/', protect, authorize('hr', 'admin'), getAllApplications);

// HR/Admin: update an application's status.
router.patch('/:id/status', protect, authorize('hr', 'admin'), updateApplicationStatus);

module.exports = router;
