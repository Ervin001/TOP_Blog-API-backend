const jwt = require('jsonwebtoken');

// verify token
function verifyToken(req, res, next) {
  // get auth header value
  const bearerHeader = req.headers['authorization'];

  // check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // split at the space
    const bearer = bearerHeader.split(' ');
    // Get token form array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // next middleware
    next();
  } else {
    // forbidden
    res.sendStatus(403);
  }
}

module.exports = verifyToken;
