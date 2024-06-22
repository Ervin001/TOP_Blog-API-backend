const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// Get users
exports.getUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Get user' });
});

// Post users (create user)
exports.postUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Post user' });
});

// Put users
exports.updateUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Put user' });
});

// Delete users
exports.deleteUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Put user' });
});
