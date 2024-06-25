const express = require('express');
const router = express.Router();

const blogs_controller = require('../controllers/blogsController');
const users_controller = require('../controllers/usersController');
const auth_controller = require('../controllers/authController');

// -------------- Auth -------------

// Get sign in form
router.get('/auth/login', auth_controller.getLogin);

// Post sign in form
router.post('/auth/login', auth_controller.postLogin);

//------------- Routes for Blogs -----------------
// Home
router.get('/', blogs_controller.index);

// GET all blogs
router.get('/blogs', blogs_controller.getPosts);

// GET single blog
router.get('/blogs/:blogId', blogs_controller.getPost);

// Posts single blog
router.post('/blog', blogs_controller.postPost);

// Update single blog
router.put('/blogs/:blogId', blogs_controller.updatePost);

// Delete blog
router.delete('/blogs/:blogId', blogs_controller.deletePost);

// Delete all blogs
router.delete('/blogs', blogs_controller.deletePosts);

// ------------ User Routes -------------------
// Get user
router.get('/users/:userId', users_controller.getUser);

// Create user
router.post('/users', users_controller.postUser);

// Update user
router.put('/users/:userId', users_controller.updateUser);

// Delete user
router.delete('/users/:userId', users_controller.deleteUser);

module.exports = router;