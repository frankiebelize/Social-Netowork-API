const { ObjectId } = require('mongoose').Types;
const { User, Thoughts } = require('../models');

// Aggregate function to get the number of students overall
const headCount = async () => {
  const numberOfStudents = await Student.aggregate()
    .count('studentCount'); 
  return numberOfStudents;
}

// Aggregate function for getting the overall grade using $avg
const react = async (UserId) =>
  User.aggregate([
    // only include the given student by using $match
    { $match: { _id: new ObjectId(UserId) } },
    {
      $unwind: '$reaction',
    },
    {
      $group: {
        _id: new ObjectId(usertId),
        reactions: '$reaction.reactionBody',
      },
    },
  ]);

module.exports = {
  // Get all users
  // async getUsers(req, res) {
  //   try {
  //     const users = await User.find();

  //     const userObj = {
  //       users,
  //       headCount: await headCount(),
  //     };

  //     res.json(userObj);
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).json(err);
  //   }
  // },

  async getUser(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }

  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const users = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!users) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json({
        users,
        grade: await grade(req.params.userId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new student
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a student and remove them from the course
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      const thoughts = await Thoughts.findOneAndUpdate(
        { user: req.params.userId },
        { $pull: { user: req.params.userId } },
        { new: true }
      );

      if (!thoughts) {
        return res.status(404).json({
          message: 'User deleted, but no thoughts found',
        });
      }

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add an assignment to a student
  async addReaction(req, res) {
    console.log('You are adding an reaction');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { reaction: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove assignment from a student
  async removeReaction(req, res) {
    try {
      const users = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { reaction: { reactionId: req.params.reactiontId } } },
        { runValidators: true, new: true }
      );

      if (!users) {
        return res
          .status(404)
          .json({ message: 'No User found with that ID :(' });
      }

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

