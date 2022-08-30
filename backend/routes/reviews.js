const express = require('express')
const {
  getReviews,
  getReview,
  getReviewsBySearch,
  postReview,
  updateReview,
  deleteReview,
  likeReview
} = require('../controllers/reviewController')


const router = express.Router()

// Get reviews using search
router.get('/search', getReviewsBySearch)

// Get all reviews
router.get('/', getReviews)

// Get reviews by id
router.get('/:id', getReview)

// Post a new review
router.post('/', postReview)

// Update a review
router.patch('/:id', updateReview)

// Delete a review
router.delete('/:id', deleteReview)

// Update likes on a review
router.patch('/:id/likeReview', likeReview)

module.exports = router