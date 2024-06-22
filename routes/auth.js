const express = require('express');
const router = express.Router();

const auth_controller = require('../controllers/authController');

// Get sign up form
router.get('/auth/sign-up', auth_controller.getSignup);

// Post sign up form
router.post('/auth/sign-up', auth_controller.postSignup);

// Get sign in form
router.get('/auth/login', auth_controller.getLogin);

// Post sign in form
router.post('/auth/login', auth_controller.postLogin);

module.exports = router;
