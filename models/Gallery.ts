import mongoose from 'mongoose'

const GallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['education', 'healthcare', 'women', 'heritage', 'infrastructure', 'food', 'environment', 'other'],
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  tags: [{
    type: String,
    trim: true
  }],
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Index for faster queries
GallerySchema.index({ category: 1, active: 1, createdAt: -1 })
GallerySchema.index({ featured: 1 })

const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema)

export default Gallery

