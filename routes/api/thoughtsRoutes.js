const router = require('express').Router();
const {
  getThoughts,
  getSingleThoughts,
  createThoughts,
  updateThoughts,
  deleteThought,
  addreaction,
  removereaction,
} = require('../../controllers/thoughtsController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThoughts);

// /api/courses/:thoughtsId
router
  .route('/:thoughtsId')
  .get(getSingleThoughts)
  .put(updateThoughts)
  .delete(deleteThought);

  // /api/thoughts/:thoughtsId/reaction
  router.route('/:thoughtsId/reaction').post(addreaction);

  /// /api/thoughts/:thoughtsId/reaction/:reactionId
  router.route('/:studentId/reaction/:reactionId').delete(removereaction);

  
module.exports = router;
