const express = require('express')
const {
  getReviews,
  getMyReviews,
  getReview,
  getReviewsBySearch,
  postReview,
  updateReview,
  deleteReview,
  likeReview
} = require('../controllers/reviewController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// Get reviews using search
router.get('/search', getReviewsBySearch)

// Get all reviews
router.get('/', getReviews)

// Get reviews by id
router.get('/:id', getReview)

// Get reviews of particular user
router.get('/myreviews/:id', requireAuth, getMyReviews)

// Post a new review
router.post('/', requireAuth, postReview)

// Update a review
router.patch('/:id', requireAuth, updateReview)

// Delete a review
router.delete('/:id', requireAuth, deleteReview)

// Update likes on a review
router.patch('/:id/likeReview', requireAuth, likeReview)

module.exports = router