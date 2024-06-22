const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, maxLength: 30, required: true },
  content: { type: String, maxLength: 120, required: true },
  comments: [{ body: String, date: Date }],
  timestamps: true,
  published: { type: Boolean, required: true },
});

BlogSchema.virtual('url').get(function () {
  return `/${this._id}`;
});

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;
