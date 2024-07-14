const express = require('express');
const router = express.Router();
const passport = require('passport');

// controllers
const blogs_controller = require('../controllers/blogsController');
// const users_controller = require('../controllers/usersController');
const auth_controller = require('../controllers/authController');

// middleware
const extractToken = require('../middleware/extractTokenMiddleware');
const verifyToken = require('../middleware/verifyTokenMiddleware');
const checkAdmin = require('../middleware/checkAdminMiddleware');
const authenticateLocal = require('../middleware/authLocalMiddleware');
const authFromJwtMiddleware = [extractToken, verifyToken, checkAdmin];
const upload = require('../middleware/handleImagesMiddleware');
const checkImgPathMiddleware = require('../middleware/checkImgPathMiddleware');

// -------------- Viewer Website ------------- //

// Get all Blogs
router.get('/blogs', blogs_controller.getBlogs);

// Get individual blog
router.get('/blogs/:blogId', blogs_controller.getBlog);

// -------------- Viewer Website ------------- //

// Create new blog
router.post(
  '/blogs',
  authFromJwtMiddleware,
  upload.single('featuredImgMedia'),
  checkImgPathMiddleware,
  blogs_controller.postBlog
);

// Delete single blog
router.delete(
  '/blogs/:blogId',
  authFromJwtMiddleware,
  blogs_controller.deleteBlog
);

// Update single blog
router.put(
  '/blogs/:blogId',
  authFromJwtMiddleware,
  upload.single('featuredImgMedia'),
  checkImgPathMiddleware,
  blogs_controller.updateBlog
);

// -------------- Auth -------------

router.post('/auth/login', authenticateLocal, auth_controller.postLogin);

module.exports = router;
