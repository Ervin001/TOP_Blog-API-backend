const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/usersController');

// Get user
router.get('/users/:userId', users_controller.getUser);

// Create user
router.post('/users', users_controller.postUser);

// Update user
router.put('/users/:userId', users_controller.updateUser);

// Delete user
router.delete('/users/:userId', users_controller.deleteUser);

module.exports = router;
