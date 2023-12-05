const { Schema, model } = require('mongoose');
const thoughtsSchema = require('./Thoughts');
const friendSchema = require('./Reactions');
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 4,
      default: 'no username',
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 4,
      default: 'no email',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    thoughts: [thoughtsSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);
const User = model('user', UserSchema);
module.exports = User;
