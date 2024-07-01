const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.index = asyncHandler(async (req, res) => {
  console.log('test');
  // return a json response
  res.json({ message: 'This is the index' });
});

exports.getPosts = asyncHandler(async (req, res) => {});

exports.getPost = asyncHandler(async (req, res) => {
  res.json({ message: 'get for single posts' });
});

//
exports.postPost = asyncHandler(async (req, res) => {
  res.json({
    message: 'Post for stingle pos',
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
