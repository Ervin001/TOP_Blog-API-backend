// verify token
function extractToken(req, res, next) {
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
    res.status(403).json({
      status: 'error',
      message: 'Forbidden: Authorization header missing or malformed',
    });
  }
}

module.exports = extractToken;
