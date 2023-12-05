const { Schema, type } = require('mongoose');
// const reactionSchema = require('./Reactions');
const ThoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 4,
      default: 'Unnamed thought',
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // reaction: [reactionSchema],
    reaction : [
      {
        reactionId: {
          type: Schema.Types.ObjectId,
          default: ObjectId,
        },
        reactionBody: {
          type: String,
          required: true,
          maxlength: 280,
        },
        username: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      }
    ]
  },
  {
    toJSON: {
      getters: true,
    },
  }
);
// const reactionSchema = new Schema(
// {
//   reactionId: {
//     type: Schema.Types.ObjectId,
//     default: ObjectId,
//   },
//   reactionBody: {
//     type: String,
//     required: true,
//     maxlength: 280,
//   },
//   username: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// }


module.exports = ThoughtsSchema;
