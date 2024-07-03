const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, maxLength: 30, unique: true, required: true },
  password: { type: String, require: true, maxLength: 75 },
  name: { type: String, required: true, maxLength: 30, unique: true },
  githubId: { type: String },
  githubToken: { type: String },
  avatar: { type: String },
  roles: { type: [String], default: ['guest'] },
  blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
});

// Virtual for ID
UserSchema.virtual('url').get(function () {
  return `/api/users/${this._id}`;
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
