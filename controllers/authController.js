const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

//  Get Sign up
exports.getSignup = asyncHandler(async (req, res) => {
  res.json({ message: 'Get Sign up' });
});

//  Post Sign up
exports.postSignup = asyncHandler(async (req, res) => {
  res.json({ message: 'Post Sign up' });
});

//  Get Sign in
exports.getLogin = asyncHandler(async (req, res) => {
  res.json({ message: 'get Log in' });
});

//  Post Sign in
exports.postLogin = asyncHandler(async (req, res) => {
  res.json({ message: 'Post Log in' });
});
