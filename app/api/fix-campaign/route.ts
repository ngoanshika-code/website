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
    
    // Get default placeholder image
    const defaultImage = getDefaultPlaceholderImage()
    
    // Fix the campaign's images
    const needsUpdate = !campaign.images || 
                       campaign.images.length === 0 || 
                       campaign.images.some(img => img === "/placeholder.jpg" || img === "/placeholder.svg")
    
    if (needsUpdate) {
      campaign.images = [defaultImage]
      campaign.featuredImage = defaultImage
      await campaign.save()
      
      return NextResponse.json({
        success: true,
        message: 'Campaign images fixed successfully',
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
        message: 'Campaign already has valid images',
        campaign: {
          id: campaign._id,
          title: campaign.title,
          images: campaign.images,
          featuredImage: campaign.featuredImage
        }
      })
    }
  } catch (error) {
    console.error('Fix campaign failed:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
