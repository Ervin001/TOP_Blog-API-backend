const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

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
