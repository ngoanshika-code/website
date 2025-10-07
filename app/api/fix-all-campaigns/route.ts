import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Campaign from '@/models/Campaign'
import { getDefaultPlaceholderImage } from '@/lib/imageUpload'

export async function POST() {
  try {
    await connectDB()
    
    // Find all campaigns with placeholder or empty images
    const campaigns = await Campaign.find({
      $or: [
        { images: { $exists: false } },
        { images: { $size: 0 } },
        { images: { $in: ["/placeholder.jpg", "/placeholder.svg"] } },
        { featuredImage: { $in: ["/placeholder.jpg", "/placeholder.svg"] } },
        { featuredImage: { $exists: false } }
      ]
    })
    
    console.log(`Found ${campaigns.length} campaigns to fix`)
    
    const defaultImage = getDefaultPlaceholderImage()
    let fixedCount = 0
    
    // Fix each campaign
    for (const campaign of campaigns) {
      const needsUpdate = !campaign.images || 
                         campaign.images.length === 0 || 
                         campaign.images.some(img => img === "/placeholder.jpg" || img === "/placeholder.svg") ||
                         !campaign.featuredImage ||
                         campaign.featuredImage === "/placeholder.jpg" ||
                         campaign.featuredImage === "/placeholder.svg"
      
      if (needsUpdate) {
        campaign.images = [defaultImage]
        campaign.featuredImage = defaultImage
        await campaign.save()
        fixedCount++
        console.log(`Fixed campaign: ${campaign.title}`)
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Fixed ${fixedCount} out of ${campaigns.length} campaigns`,
      totalCampaigns: campaigns.length,
      fixedCampaigns: fixedCount,
      defaultImageUrl: defaultImage
    })
  } catch (error) {
    console.error('Fix all campaigns failed:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
