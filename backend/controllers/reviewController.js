const mongoose = require('mongoose')
const Review = require('../models/reviewModel')

// Get all reviews
const getReviews = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 6
    const startIndex = (Number(page) - 1)*LIMIT
    const total = await Review.countDocuments({})

    const reviews = await Review.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex)

    res.status(200).json({ data: reviews, currentPage: Number(page), numberOfPages:  Math.ceil(total/LIMIT)})

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// GET a single review by id
const getReview = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'No such Review exists'})
  }

  const review = await Review.findById(id)

  if (!review) {
    return res.status(404).json({ message: 'No such Review exists'})
  }

  res.status(200).json(review)
}

// Get my reviews
const getMyReviews = async (req, res) => {
  const { id } = req.params

  try {
    const total = await Review.countDocuments({})
    const reviews = await Review.find({ creator: id })

    const sent = {data: reviews, currentPage: 1, numberOfPages: Math.ceil(total/8)}
    res.status(200).json(sent)

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// Get reviews using search
const getReviewsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query

  try {
    const title = new RegExp(searchQuery, 'i')

    const reviews = await Review.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ] })

    res.json({ data: reviews })

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// Post a new review
const postReview = async (req, res) => {
  const review = req.body

  const newReview = new Review({ ...review, creator: req.userId })
  
  try {
    await newReview.save()

    res.status(201).json(newReview)

  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

// update a review
const updateReview = async (req, res) => {
  const { id:_id } = req.params
  const review = req.body

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No such review exists')

  const updatedReview = await Review.findByIdAndUpdate(_id, { ...review, _id }, {new: true})
  
  res.json(updatedReview)
}

// Delete a review
const deleteReview = async (req, res) => {
  const{ id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No such review exists')

  const review = await Review.findByIdAndRemove(id)

  if (!review) {
    return res.status(404).json({ message: 'No such review exists' })
  }

  res.status(200).json({ message: 'Post deleted successfully'})
}

// Handle likes
const likeReview = async (req, res) => {
  const { id } = req.params

  if(!req.userId) return res.json({ message: 'Unauthenticated' })

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No such Review exists')
  }

  const review = await Review.findById(id)

  const index = review.likes.findIndex((id) => id === String(req.userId))

  if(index === -1){
      //like a post
      review.likes.push(req.userId)
  } else {
      //dislike a liked post
      review.likes = review.likes.filter((id) => id !== String(req.userId))
  }

  const updatedReview = await Review.findByIdAndUpdate(id, review, { new: true })

  res.json(updatedReview)
}

const commentReview = async (req, res) => {
  const { id } = req.params
  const { value } = req.body

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No such Review exists')
  }

  const review = await Review.findById(id)
  review.comments.push(value)

  const updatedReview = await Review.findByIdAndUpdate(id, review, { new: true })
  res.json(updatedReview)
}

module.exports = {
  getReviews,
  getMyReviews,
  getReview,
  getReviewsBySearch,
  postReview,
  updateReview,
  deleteReview,
  likeReview,
  commentReview
}