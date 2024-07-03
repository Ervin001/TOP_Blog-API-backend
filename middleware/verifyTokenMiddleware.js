const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // get token
  const token = req.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      return res
        .status(403)
        .json({
          status: 'error',
          message: 'Forbidden: Invalid or expired token',
        });
    }
    // valid token, attach decoded data
    req.user = authData.user;
    next();
  });
}

module.exports = verifyToken;
