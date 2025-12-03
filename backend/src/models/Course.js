const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Custom ID from constants
  title: { type: String, required: true },
  shortDescription: String,
  longDescription: String,
  category: String,
  price: Number,
  originalPrice: Number,
  thumbnail: String,
  rating: Number,
  reviewsCount: Number,
  level: String,
  duration: String,
  lastUpdated: String,
  instructor: {
    id: String,
    name: String,
    bio: String,
    avatarUrl: String,
    rating: Number
  },
  skills: [String],
  features: [String],
  syllabus: [{
    title: String,
    duration: String,
    lessons: [{
      title: String,
      type: { type: String }
    }]
  }],
  bestseller: Boolean
});

module.exports = mongoose.model('Course', CourseSchema);