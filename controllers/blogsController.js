const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Blog = require('../models/blog');
const User = require('../models/user');

// get blogs
exports.getBlogs = asyncHandler(async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;

  // Parse page and pageSize as integers
  const pageNumber = parseInt(page);
  const limit = parseInt(pageSize);

  // Calculate skip
  const skip = (pageNumber - 1) * limit;

  // Fetch total count of blogs
  const totalBlogs = await Blog.countDocuments({});

  // calculate total pages
  const totalPages = Math.ceil(totalBlogs / limit);

  // incase requested page is higher than results
  if (pageNumber > totalPages) {
    return res.status(200).json({
      status: 'success',
      message: 'No more results available',
    });
  }

  // Fetch blogs for the current page
  const blogs = await Blog.find({}).skip(skip).limit(limit).exec();

  res.json({
    status: 'success',
    blogs,
  });
});

exports.getBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

  // no blogId
  if (!blogId) {
    return res
      .status(400)
      .json({ status: 'error', message: 'BlogId is required' });
  }

  // check if valid mongoStr
  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    res.status(400).json({ status: 'error', message: 'Invalid BlogId' });
  }

  const blog = await Blog.findById(blogId);

  if (!blog) {
    // incorrect id
    res.status(404).json({ status: 'error', message: 'Blog not found' });
  }

  res.status(200).json({ status: 'success', blog });
});

exports.postBlog = [
  // validate and sanitize fields
  body('title')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Title must be filled')
    .escape(),

  body('subtitle')
    .trim()
    .isString()
    .withMessage('Subtitle must be a string')
    .escape(),

  body('teaser')
    .trim()
    .isString()
    .withMessage('Teaser must be a string')
    .escape(),

  body('content')
    .trim()
    .isString()
    .withMessage('Content must be a string')
    .escape(),

  body('comments').isArray().withMessage('Comments must be in array'),

  body('featuredImgMedia')
    .isLength({ min: 1 })
    .withMessage('Img path must be filled')
    .custom((value) => {
      if (typeof value !== 'string') {
        throw new Error('Img path must be a string');
      }
      // user might not have correct img format
      if (!value.match(/\.(jpg|jpeg|png|gif)$/)) {
        throw new Error('Invalid image format');
      }
      return true;
    })
    .escape(),

  body('published').toBoolean(),

  asyncHandler(async (req, res) => {
    // handle errors
    const errors = validationResult(req);
    // for better error readability
    const fieldErrors = {};

    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        fieldErrors[error.path] = error.msg;
      });

      return res.status(400).json({ status: 'error', fieldErrors });
    }

    // after validation passes
    // current user
    const owner = req.user._id;
    const author = req.user.name;

    // retrieve from body
    const {
      title,
      subtitle,
      teaser,
      content,
      comments,
      featuredImgMedia,
      published,
    } = req.body;

    const blog = new Blog({
      owner,
      author,
      title,
      subtitle,
      teaser,
      content,
      comments,
      featuredImgMedia,
      published,
    });

    // save log to db
    await blog.save();

    res
      .status(201)
      .json({ status: 'success', message: 'Blog created successfully' });
  }),
];

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
