function checkImgPathMiddleware(req, res, next) {
  //file does not exists
  if (!req.file) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Must include a file name' });
  }

  next();
}

module.exports = checkImgPathMiddleware;
