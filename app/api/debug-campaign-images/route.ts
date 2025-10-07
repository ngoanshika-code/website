import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Campaign from '@/models/Campaign'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const campaignId = searchParams.get('id')
    
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
    
    return NextResponse.json({
      success: true,
      campaign: {
        id: campaign._id,
        title: campaign.title,
        images: campaign.images,
        featuredImage: campaign.featuredImage,
        imageCount: campaign.images?.length || 0,
        imageDetails: campaign.images?.map((url, index) => ({
          index,
          url,
          isValid: url && typeof url === 'string' && url.startsWith('http')
        })) || []
      }
    })
  } catch (error) {
    console.error('Debug campaign images failed:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
