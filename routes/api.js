const express = require('express');
const router = express.Router();
const passport = require('passport');

// controllers
const blogs_controller = require('../controllers/blogsController');
const users_controller = require('../controllers/usersController');
const auth_controller = require('../controllers/authController');

// middleware
const extractToken = require('../middleware/extractTokenMiddleware');
const verifyToken = require('../middleware/verifyTokenMiddleware');
const authenticateLocal = require('../middleware/authLocalMiddleware');
const checkAdmin = require('../middleware/checkAdminMiddleware');
const authFromJwtMiddleware = [extractToken, verifyToken, checkAdmin];

// -------------- Auth -------------
// Get sign in form
router.get('/auth/login', auth_controller.getLogin);

router.post('/auth/login', authenticateLocal, auth_controller.postLogin);

//------------- Routes for Blogs -----------------
// Home
router.get('/', blogs_controller.index);

// GET all blogs
router.get('/blogs', blogs_controller.getPosts);

// GET single blog
router.get('/blogs/:blogId', blogs_controller.getPost);

// Posts single blog
router.post('/blogs', authFromJwtMiddleware, blogs_controller.postPost);

// Update single blog
router.put(
  '/blogs/:blogId',
  authFromJwtMiddleware,
  blogs_controller.updatePost
);

// Delete blog
router.delete(
  '/blogs/:blogId',
  authFromJwtMiddleware,
  blogs_controller.deletePost
);

// Delete all blogs
router.delete('/blogs', authFromJwtMiddleware, blogs_controller.deletePosts);

// ------------ User Routes -------------------
// Get user
router.get('/users/:userId', authFromJwtMiddleware, users_controller.getUser);

// Create user
router.post('/users', users_controller.postUser);

// Update user
router.put(
  '/users/:userId',
  authFromJwtMiddleware,
  users_controller.updateUser
);

// Delete user
router.delete(
  '/users/:userId',
  authFromJwtMiddleware,
  users_controller.deleteUser
);

module.exports = router;
