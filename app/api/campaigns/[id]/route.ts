import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Campaign from '@/models/Campaign'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const campaign = await Campaign.findById(params.id)
    
    if (!campaign) {
      return NextResponse.json(
        { success: false, error: 'Campaign not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      campaign: campaign
    })
  } catch (error) {
    console.error('Error fetching campaign:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch campaign' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const campaign = await Campaign.findById(params.id)
    
    if (!campaign) {
      return NextResponse.json(
        { success: false, error: 'Campaign not found' },
        { status: 404 }
      )
    }

    const contentType = request.headers.get('content-type')
    
    let body
    if (contentType?.includes('multipart/form-data')) {
      // Handle image uploads
      const formData = await request.formData()
      
      body = {}
      const newImageFiles = []
      
      for (const [key, value] of formData.entries()) {
        if (key === 'newImages') {
          if (value instanceof File) {
            newImageFiles.push(value)
          }
        } else if (key === 'existingImages') {
          try {
            body.images = JSON.parse(value as string)
          } catch (e) {
            body.images = []
          }
        } else if (key === 'imagesToRemove') {
          try {
            const imagesToRemove = JSON.parse(value as string)
            // Remove images from Cloudinary if needed
            console.log('Images to remove:', imagesToRemove)
          } catch (e) {
            console.log('Error parsing images to remove:', e)
          }
        } else if (key === 'milestones') {
          try {
            const milestones = JSON.parse(value as string)
            body.milestones = milestones
          } catch (e) {
            body.milestones = []
          }
        } else {
          body[key] = value
        }
      }
      
      // Handle new image uploads
      if (newImageFiles.length > 0) {
        try {
          const { uploadMultipleImages } = await import('@/lib/imageUpload')
          console.log(`Uploading ${newImageFiles.length} new images to Cloudinary...`)
          const uploadedImageUrls = await uploadMultipleImages(newImageFiles)
          body.images = [...(body.images || []), ...uploadedImageUrls]
          console.log('New images uploaded successfully:', uploadedImageUrls)
        } catch (error) {
          console.error('Error uploading new images to Cloudinary:', error)
        }
      }
      
      // Ensure we have images
      if (!body.images || body.images.length === 0) {
        const { getDefaultPlaceholderImage } = await import('@/lib/imageUpload')
        const defaultImage = getDefaultPlaceholderImage()
        body.images = [defaultImage]
        body.featuredImage = defaultImage
      }
      
      // Set featured image if not specified
      if (!body.featuredImage && body.images && body.images.length > 0) {
        body.featuredImage = body.images[0]
      }
      
    } else {
      // Handle JSON updates (no images)
      body = await request.json()
    }
    
    // Update campaign fields
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    )
    
    console.log(`Campaign updated: ${updatedCampaign.title} (${params.id})`)

    return NextResponse.json({
      success: true,
      message: 'Campaign updated successfully',
      campaign: updatedCampaign
    })
  } catch (error) {
    console.error('Error updating campaign:', error)
    
    let errorMessage = 'Failed to update campaign'
    if (error instanceof Error) {
      if (error.message.includes('validation')) {
        errorMessage = 'Validation error: ' + error.message
      } else if (error.message.includes('duplicate')) {
        errorMessage = 'Campaign with this title already exists'
      } else {
        errorMessage = error.message
      }
    }
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const campaign = await Campaign.findById(params.id)
    
    if (!campaign) {
      return NextResponse.json(
        { success: false, error: 'Campaign not found' },
        { status: 404 }
      )
    }

    await Campaign.findByIdAndDelete(params.id)
    
    console.log(`Campaign deleted: ${campaign.title} (${params.id})`)

    return NextResponse.json({
      success: true,
      message: 'Campaign deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting campaign:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete campaign' },
      { status: 500 }
    )
  }
}