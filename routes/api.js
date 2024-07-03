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
const authenticateLocal = require('../middleware/authLocalMiddleware');
const checkAdmin = require('../middleware/checkAdminMiddleware');
const authFromJwtMiddleware = [extractToken, verifyToken, checkAdmin];

// -------------- Viewer Website ------------- //

// Get all Blogs
router.get('/blogs', blogs_controller.getBlogs);

// Get individual blog
router.get('/blogs/:blogId', blogs_controller.getBlog);

// Get Categories (future)
// router.get('/blogs/categories', blogs_controller.categories);

// Get category (future)
// router.get('/blogs/category/:categoryId', blogs_controller.category);

// -------------- Viewer Website ------------- //

// Create new blog
router.post('/blogs', authFromJwtMiddleware, blogs_controller.postBlog);

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
  blogs_controller.updateBlog
);

// Create new category
router.post(
  '/blogs/categories',
  authFromJwtMiddleware,
  blogs_controller.postCategory
);

// Delete category
router.delete(
  '/blogs/categories/:categoryId',
  authFromJwtMiddleware,
  blogs_controller.deleteCategory
);

// Update Category
router.put(
  '/blogs/categories/:category',
  authFromJwtMiddleware,
  blogs_controller.updateCategory
);

// -------------- Auth -------------

router.post('/auth/login', authenticateLocal, auth_controller.postLogin);

module.exports = router;
