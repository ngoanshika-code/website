import mongoose, { Schema, Document } from 'mongoose'

export interface IMilestone {
  amount: number
  description: string
  completed: boolean
}

export interface IDonationCampaign extends Document {
  // Campaign Information
  title: string
  description: string
  aboutCampaign: string
  goalAmount: number
  raisedAmount: number
  backersCount: number
  daysLeft: number
  
  // Campaign Details
  startDate: Date
  endDate: Date
  location: string
  organizer: string
  category: string
  categoryName: string
  
  // Campaign Status
  status: 'active' | 'completed' | 'paused' | 'cancelled'
  progress: string
  
  // Expected Impact
  expectedBeneficiaries: string
  expectedDuration: string
  impactDescription: string
  
  // Campaign Features
  taxDeductible: boolean
  securePayment: boolean
  transparentReporting: boolean
  
  // Funding Milestones
  milestones: IMilestone[]
  
  // Images
  images: string[]
  featuredImage?: string
  
  // Metadata
  createdAt: Date
  updatedAt: Date
}

const MilestoneSchema = new Schema<IMilestone>({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false }
})

const DonationCampaignSchema = new Schema<IDonationCampaign>({
  // Campaign Information
  title: { type: String, required: true },
  description: { type: String, required: true },
  aboutCampaign: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 },
  backersCount: { type: Number, default: 0 },
  daysLeft: { type: Number, default: 0 },
  
  // Campaign Details
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: { type: String, required: true },
  category: { type: String, required: true },
  categoryName: { type: String, required: true },
  
  // Campaign Status
  status: { 
    type: String, 
    enum: ['active', 'completed', 'paused', 'cancelled'],
    default: 'active'
  },
  progress: { type: String, default: '0' },
  
  // Expected Impact
  expectedBeneficiaries: { type: String, required: true },
  expectedDuration: { type: String, required: true },
  impactDescription: { type: String, required: true },
  
  // Campaign Features
  taxDeductible: { type: Boolean, default: true },
  securePayment: { type: Boolean, default: true },
  transparentReporting: { type: Boolean, default: true },
  
  // Funding Milestones
  milestones: [MilestoneSchema],
  
  // Images
  images: [{ type: String }],
  featuredImage: { type: String },
  
  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
})

// Update the updatedAt field before saving
DonationCampaignSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.DonationCampaign || mongoose.model<IDonationCampaign>('DonationCampaign', DonationCampaignSchema)
