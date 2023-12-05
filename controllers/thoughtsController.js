const { Thoughts, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThoughts(req, res) {
    try {
      const thoughts = await Thoughts.findOne({ _id: req.params.thoughtsId })
        .select('-__v');

      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts with that ID' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThoughts(req, res) {
    try {
      const thoughts = await Thoughts.create(req.body);
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thoughts = await Course.findOneAndDelete({ _id: req.params.thoughtsId });

      if (!thoughts) {
        res.status(404).json({ message: 'No thoughts with that ID' });
      }

      await User.deleteMany({ _id: { $in: course.User } });
      res.json({ message: 'thoughts and users deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThoughts(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        res.status(404).json({ message: 'No thoughts with this id!' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
