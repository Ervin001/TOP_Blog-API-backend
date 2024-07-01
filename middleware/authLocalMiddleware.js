const passport = require('passport');

function authenticateLocal(req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    // 401 Unauthorized status
    if (!user) {
      return res.status(401).json({
        message: info ? info.message : 'Unauthorized',
        errorType: info ? info.errorType : 'AuthenticationError',
      });
    }
    // Authenticated user attached to req
    req.user = user;
    next();
  })(req, res, next);
}

module.exports = authenticateLocal;
