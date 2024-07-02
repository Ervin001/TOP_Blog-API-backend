const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// get blogs
exports.blogs = asyncHandler(async (req, res) => {
  res.json({ message: 'GET all blogs' });
});

exports.blog = asyncHandler(async (req, res) => {
  res.json({ message: 'GET single blog' });
});

exports.postBlog = asyncHandler(async (req, res) => {
  res.json({ message: 'POST Blog' });
});

exports.deleteBlog = asyncHandler(async (req, res) => {
  res.json({ message: 'Delete Blog' });
});

exports.updateBlog = asyncHandler(async (req, res) => {
  res.json({ message: 'PUT Blog' });
});

exports.postCategory = asyncHandler(async (req, res) => {
  res.json({ message: 'POST category' });
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  res.json({ message: 'DELETE category' });
});

exports.updateCategory = asyncHandler(async (req, res) => {
  res.json({ message: 'PUT category' });
});
