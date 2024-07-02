const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { body, matchedData, validationResult } = require('express-validator');
require('dotenv').config();
const User = require('../models/user');

// Get user
exports.getUser = asyncHandler(async (req, res) => {
  const email = req.body.email;

  // Handle case when no email)
  if (!email) res.status(400).json({ message: 'Email is required' });

  const user = await User.findOne({ email });
  // Incase of no user
  if (!user) res.status(404).json({ message: 'User not found' });

  res.status(200).json(user);
});

// for experimental use(tempt route)
exports.getUsers = asyncHandler(async (req, res) => {
  console.log(req.body);

  const users = await User.find({});
  res.status(200).json({ users });
});

// Post users (create user)
exports.postUser = [
  // Validate and sanitize fields
  body('email')
    .trim()
    .escape()
    .isEmail()
    .withMessage('Must use an email')
    .custom(async (value) => {
      // case insensitive
      const regex = new RegExp(`^${value}$`, 'i');
      // check if username unique in db
      const existingUser = await User.findOne({ email: regex });
      if (existingUser) {
        throw new Error('Email is already in use');
      }
      return true;
    }),
  body('password')
    .trim()
    .isLength({ min: 1, max: 75 })
    .withMessage('Password must be between 1 and 75 characters')
    .matches(/^[a-zA-Z0-9-_]+$/)
    .withMessage(
      'Password can only contain letters, numbers, hyphens, and underscores'
    )
    .escape(),

  asyncHandler(async (req, res) => {
    // get errors
    const errors = validationResult(req);
    // obj for separating errors
    if (!errors.isEmpty()) {
      const fieldErrors = {};
      errors.array().forEach((error) => {
        fieldErrors[error.path] = error.msg;
      });

      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        fieldErrors,
      });
    }

    // everything worked
    const pssw = req.body.password;
    bcrypt.hash(pssw, +process.env.BCRYPT_SALT, async (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password', err);
        return res
          .status(500)
          .json({ status: 'error', message: 'Internal Server Error' });
      }

      // Create users
      const user = new User({
        email: req.body.email,
        password: hashedPassword,
      });

      // saves user to db
      await user.save();

      return res.json({
        status: 'success',
        message: 'User created successfully',
      });
    });
  }),
];

// Put users
exports.updateUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Put user' });
});

// Delete users
exports.deleteUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Put user' });
});
