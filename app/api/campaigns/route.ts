import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Campaign from '@/models/Campaign'
import { uploadMultipleImages, getDefaultPlaceholderImage } from '@/lib/imageUpload'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const campaigns = await Campaign.find({})
      .sort({ createdAt: -1 }) // Sort by newest first
      .lean() // Convert to plain objects for better performance
    
    return NextResponse.json({
      success: true,
      campaigns: campaigns
    })
  } catch (error) {
    console.error('Error fetching campaigns:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch campaigns' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    // Check if request is FormData or JSON
    const contentType = request.headers.get('content-type')
    
    let body
    if (contentType?.includes('multipart/form-data')) {
      // Handle FormData
      const formData = await request.formData()
      
      // Convert FormData to object
      body = {}
      const imageFiles = []
      
      for (const [key, value] of formData.entries()) {
        if (key === 'images') {
          // Collect image files separately
          if (value instanceof File) {
            imageFiles.push(value)
          }
        } else if (key === 'milestones') {
          // Handle milestones array
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
      
      // Upload images to Cloudinary
      try {
        if (imageFiles.length > 0) {
          console.log(`Uploading ${imageFiles.length} images to Cloudinary...`)
          const uploadedImageUrls = await uploadMultipleImages(imageFiles)
          body.images = uploadedImageUrls
          body.featuredImage = uploadedImageUrls[0] // Set first image as featured
          console.log('Images uploaded successfully:', uploadedImageUrls)
        } else {
          // If no images were uploaded, use a default placeholder from Cloudinary
          const defaultImage = getDefaultPlaceholderImage()
          body.images = [defaultImage]
          body.featuredImage = defaultImage
        }
      } catch (error) {
        console.error('Error uploading images to Cloudinary:', error)
        // Fallback to placeholder images if upload fails
        const defaultImage = getDefaultPlaceholderImage()
        body.images = [defaultImage]
        body.featuredImage = defaultImage
      }
      
      // Convert string numbers to actual numbers
      if (body.goalAmount) body.goalAmount = parseFloat(body.goalAmount as string)
      if (body.raisedAmount) body.raisedAmount = parseFloat(body.raisedAmount as string)
      if (body.backersCount) body.backersCount = parseInt(body.backersCount as string)
      if (body.daysLeft) body.daysLeft = parseInt(body.daysLeft as string)
      if (body.progress) body.progress = parseFloat(body.progress as string)
      if (body.expectedBeneficiaries) body.expectedBeneficiaries = parseInt(body.expectedBeneficiaries as string)
      
      // Convert boolean strings to booleans
      if (body.taxDeductible) body.taxDeductible = body.taxDeductible === 'true'
      if (body.securePayment) body.securePayment = body.securePayment === 'true'
      if (body.transparentReporting) body.transparentReporting = body.transparentReporting === 'true'
      
      // Convert milestone amounts to numbers
      if (body.milestones) {
        body.milestones = body.milestones.map((milestone: any) => ({
          ...milestone,
          amount: parseFloat(milestone.amount) || 0,
          completed: milestone.completed === 'true' || milestone.completed === true
        }))
      }
    } else {
      // Handle JSON
      body = await request.json()
    }
    
    // Debug logging
    console.log('Received body:', body)
    
    // Create new campaign
    const campaign = new Campaign(body)
    await campaign.save()
    
    console.log('Campaign created successfully:', campaign._id)
    
    return NextResponse.json({
      success: true,
      campaign: campaign
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating campaign:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Failed to create campaign'
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