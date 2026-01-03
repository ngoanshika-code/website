import mongoose from 'mongoose'

const GallerySchema = new mongoose.Schema({
  image: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['education', 'healthcare', 'women', 'heritage', 'infrastructure', 'food', 'environment', 'other'],
    trim: true
  },
  location: {
    type: String,
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

// Delete the cached model if it exists (to allow schema changes in development)
if (process.env.NODE_ENV === 'development' && mongoose.models.Gallery) {
  delete mongoose.models.Gallery
}

const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema)

export default Gallery

