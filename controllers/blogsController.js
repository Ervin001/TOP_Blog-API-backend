const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async (req, res) => {
  console.log(req);
  // return a json response
  res.json({ message: 'This is the index' });
});
