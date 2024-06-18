const express = require('express');
const router = express.Router();

// Controllers
const blogs_controller = require('../controllers/blogsController');

// paths
router.get('/', blogs_controller.index);

module.exports = router;
