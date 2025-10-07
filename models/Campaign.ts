import mongoose from 'mongoose'

const CampaignSchema = new mongoose.Schema({
  // Campaign Information
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
  aboutCampaign: {
    type: String,
    trim: true
  },
  goalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  raisedAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  backersCount: {
    type: Number,
    default: 0,
    min: 0
  },
  daysLeft: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Campaign Details
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  organizer: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  categoryName: {
    type: String,
    required: true,
    trim: true
  },
  
  // Campaign Status
  status: {
    type: String,
    enum: ['active', 'completed', 'paused', 'cancelled'],
    default: 'active'
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  
  // Expected Impact
  expectedBeneficiaries: {
    type: Number,
    default: 0,
    min: 0
  },
  expectedDuration: {
    type: String,
    trim: true
  },
  impactDescription: {
    type: String,
    trim: true
  },
  
  // Campaign Features
  taxDeductible: {
    type: Boolean,
    default: true
  },
  securePayment: {
    type: Boolean,
    default: true
  },
  transparentReporting: {
    type: Boolean,
    default: true
  },
  
  // Funding Milestones
  milestones: [{
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  }],
  
  // Images
  images: [{
    type: String,
    trim: true
  }],
  featuredImage: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})

// Calculate progress percentage
CampaignSchema.methods.calculateProgress = function() {
  if (this.goalAmount > 0) {
    this.progress = Math.round((this.raisedAmount / this.goalAmount) * 100)
  }
  return this.progress
}

// Calculate days left
CampaignSchema.methods.calculateDaysLeft = function() {
  const now = new Date()
  const end = new Date(this.endDate)
  const diffTime = end.getTime() - now.getTime()
  this.daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return this.daysLeft
}

// Pre-save middleware to calculate progress and days left
CampaignSchema.pre('save', function(next) {
  this.calculateProgress()
  this.calculateDaysLeft()
  next()
})

const Campaign = mongoose.models.Campaign || mongoose.model('Campaign', CampaignSchema)

export default Campaign

