const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.index = asyncHandler(async (req, res) => {
  // return a json response
  res.json({ message: 'This is the index' });
});

exports.getPosts = asyncHandler(async (req, res) => {
  res.json({ message: 'Posts for all posts' });
});

exports.getPost = asyncHandler(async (req, res) => {
  res.json({ message: 'Posts for single posts' });
});

exports.postPost = asyncHandler(async (req, res) => {
  res.json({ message: 'Post posted' });
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
