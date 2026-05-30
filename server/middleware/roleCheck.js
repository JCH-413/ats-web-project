// Role-based access control middleware
// Checks if user has required role (candidate, hr, admin)
// Must run after the `protect` middleware (which sets req.user).
const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
  }
  next();
};

module.exports = { authorize };
