const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, maxLength: 100, required: true },
  subtitle: { type: String, maxLength: 50 },
  teaser: { type: String, maxLength: 200 },
  content: { type: String },
  comments: [{ body: String, date: Date }],
  featuredImgMedia: { type: String, required: true },
  timestamps: true,
  published: { type: Boolean, default: false },
});

BlogSchema.virtual('url').get(function () {
  return `/api/blogs/${this._id}`;
});

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;
