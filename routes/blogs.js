const express = require('express');
const router = express.Router();

const blogs_controller = require('../controllers/blogsController');

router.get('/', blogs_controller.index);

//------------- Routes for Blogs -----------------
// GET all blogs
router.get('/blogs', blogs_controller.getPosts);

// GET single blog
router.get('/blogs/:blogId', blogs_controller.getPost);

// Posts single blog
router.post('/blogs', blogs_controller.postPost);

// Update single blog
router.put('/blogs/:blogId', blogs_controller.updatePost);

// Delete blog
router.delete('/blogs/:blogId', blogs_controller.deletePost);

// Delete all blogs
router.delete('/blogs', blogs_controller.deletePosts);

module.exports = router;
