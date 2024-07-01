function checkAdmin(req, res, next) {
  // check if admin
  if (req.user.roles.includes('admin')) {
    return next(); // User is admin
  }
  return res.status(403).json({ message: 'Not authorized to use this route.' });
}

module.exports = checkAdmin;
