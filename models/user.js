const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, maxLenght: 28, unique: true },
  password: { type: String, require: true, maxLenght: 75 },
  githubId: { type: String },
  githubToken: { type: String },
  avatar: { type: String },
  roles: { type: [String], default: ['guest'] },
});

// Virtual for ID
UserSchema.virtual('url').get(function () {
  return `/${this._id}`;
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
