// file upload
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// should avatar dir not exists
function checkBlogImagesDirExist() {
  const blogImgDirectory = 'blogImages/';

  if (!fs.existsSync(blogImgDirectory)) {
    fs.mkdirSync(blogImgDirectory, { recursive: true });
  }
}

// change the names of the images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    checkBlogImagesDirExist(); // needs to check before cb runs
    cb(null, 'blogImages/');
  },
  filename: function (req, file, cb) {
    // generate a random name
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

// does not need 'dest' since diskStorage was used
const upload = multer({ storage: storage });

module.exports = upload;
