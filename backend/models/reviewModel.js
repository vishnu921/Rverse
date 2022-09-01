const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    creator: {
      type: String,
      required: true
    },
    tags: [String],
    selectedFile: String,
    likes: {
      type: [String],
      default: []
    }
}, { timestamps: true })

module.exports = mongoose.model('Review', reviewSchema)