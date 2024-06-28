const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.index = asyncHandler(async (req, res) => {
  console.log('test');
  // return a json response
  res.json({ message: 'This is the index' });
});

exports.getPosts = asyncHandler(async (req, res) => {
  res.json({ message: 'Posts for all posts' });
});

exports.getPost = asyncHandler(async (req, res) => {
  res.json({ message: 'Posts for single posts' });
});

//
exports.postPost = asyncHandler(async (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({ message: 'Post created', authData });
    }
  });
});

exports.updatePost = asyncHandler(async (req, res) => {
  res.json({ message: 'Update for single posts' });
});

exports.deletePost = asyncHandler(async (req, res) => {
  res.json({ message: 'Delete for single posts' });
});

exports.deletePosts = asyncHandler(async (req, res) => {
  res.json({ message: 'Delete for all posts' });
});
