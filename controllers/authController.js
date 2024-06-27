const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

//  Get Sign in
exports.getLogin = asyncHandler(async (req, res) => {
  res.json({ message: 'get Log in' });
});

//  Post Sign in
exports.postLogin = asyncHandler(async (req, res, next) => {
  // req.logIn(user, function (err) {
  //   if (err) {
  //     return next(err);
  //   }
  //   return res.json({ message: 'Post Log in' });
  // });
  console.log(req);
  res.json(req.body);
});
