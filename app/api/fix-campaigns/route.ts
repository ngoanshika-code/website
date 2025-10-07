import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Campaign from '@/models/Campaign'

export async function POST() {
  try {
    await connectDB()
    
    // Find all campaigns with empty or missing images
    const campaigns = await Campaign.find({
      $or: [
        { images: { $exists: false } },
        { images: { $size: 0 } },
        { images: { $eq: [] } }
      ]
    })
    
    console.log(`Found ${campaigns.length} campaigns with missing images`)
    
    // Update each campaign to have placeholder images
    const updatePromises = campaigns.map(async (campaign) => {
      campaign.images = ['/placeholder.jpg']
      if (!campaign.featuredImage) {
        campaign.featuredImage = '/placeholder.jpg'
      }
      return campaign.save()
    })
    
    await Promise.all(updatePromises)
    
    return NextResponse.json({
      success: true,
      message: `Fixed ${campaigns.length} campaigns with missing images`,
      updatedCampaigns: campaigns.length
    })
  } catch (error) {
    console.error('Fix campaigns failed:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
