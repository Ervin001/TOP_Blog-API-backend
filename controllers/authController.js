const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

//  Get Sign in
exports.getLogin = asyncHandler(async (req, res) => {
  res.json({ message: 'get Log in' });
});

//  Post Sign in
exports.postLogin = asyncHandler(async (req, res, next) => {
  const user = req.user;

  jwt.sign(
    { user },
    process.env.JWT_SECRET,
    { expiresIn: '3d' },
    (err, token) => {
      res.json({
        token,
      });
    }
  );
});
