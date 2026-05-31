// Auth controller: register, login
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// Shape the user object returned to the client (never expose the password).
const publicUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
  profilePicURL: user.profilePicURL,
});

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    // Only allow self-registration as candidate or hr (not admin).
    const safeRole = ['candidate', 'hr'].includes(role) ? role : 'candidate';

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }

    const user = await User.create({ name, email, password, role: safeRole, phone });

    return res.status(201).json({ token: signToken(user._id), user: publicUser(user) });
  } catch (err) {
    // Surface Mongoose validation errors (e.g. password too short) clearly.
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map((e) => e.message).join(', ');
      return res.status(400).json({ message });
    }
    console.error('register error:', err);
    return res.status(500).json({ message: 'Failed to register' });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.json({ token: signToken(user._id), user: publicUser(user) });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ message: 'Failed to log in' });
  }
};

// GET /api/auth/me  (protected)
const getMe = async (req, res) => {
  // `protect` middleware has already loaded req.user (without password).
  return res.json(publicUser(req.user));
};

module.exports = { register, login, getMe };
