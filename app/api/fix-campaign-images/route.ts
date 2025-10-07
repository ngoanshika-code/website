import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Campaign from '@/models/Campaign'
import { getDefaultPlaceholderImage } from '@/lib/imageUpload'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { campaignId } = body
    
    if (!campaignId) {
      return NextResponse.json(
        { success: false, error: 'Campaign ID is required' },
        { status: 400 }
      )
    }
    
    const campaign = await Campaign.findById(campaignId)
    
    if (!campaign) {
      return NextResponse.json(
        { success: false, error: 'Campaign not found' },
        { status: 404 }
      )
    }
    
    // Get the correct placeholder URL
    const correctPlaceholder = getDefaultPlaceholderImage()
    
    // Check if the campaign has the old placeholder URL
    const hasOldPlaceholder = campaign.images?.includes('https://res.cloudinary.com/djyp5yzil/image/upload/donation-campaigns/placeholder') ||
                             campaign.featuredImage === 'https://res.cloudinary.com/djyp5yzil/image/upload/donation-campaigns/placeholder'
    
    if (hasOldPlaceholder) {
      // Update to the correct placeholder URL
      campaign.images = campaign.images?.map(img => 
        img === 'https://res.cloudinary.com/djyp5yzil/image/upload/donation-campaigns/placeholder' 
          ? correctPlaceholder 
          : img
      ) || [correctPlaceholder]
      
      if (campaign.featuredImage === 'https://res.cloudinary.com/djyp5yzil/image/upload/donation-campaigns/placeholder') {
        campaign.featuredImage = correctPlaceholder
      }
      
      await campaign.save()
      
      return NextResponse.json({
        success: true,
        message: 'Campaign images updated to correct placeholder URL',
        campaign: {
          id: campaign._id,
          title: campaign.title,
          images: campaign.images,
          featuredImage: campaign.featuredImage
        }
      })
    } else {
      return NextResponse.json({
        success: true,
        message: 'Campaign already has correct image URLs',
        campaign: {
          id: campaign._id,
          title: campaign.title,
          images: campaign.images,
          featuredImage: campaign.featuredImage
        }
      })
    }
  } catch (error) {
    console.error('Fix campaign images failed:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
