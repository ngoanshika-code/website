import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Gallery from '@/models/Gallery'
import { uploadToCloudinary } from '@/lib/imageUpload'

// GET - Fetch single gallery item
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const galleryItem = await Gallery.findById(params.id)

    if (!galleryItem) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      gallery: galleryItem
    })
  } catch (error) {
    console.error('Error fetching gallery item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery item' },
      { status: 500 }
    )
  }
}

// PUT - Update gallery item
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const formData = await request.formData()
    
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const location = formData.get('location') as string
    const date = formData.get('date') as string
    const tags = formData.get('tags') as string
    const featured = formData.get('featured') === 'true'
    const active = formData.get('active') === 'true'
    const newImage = formData.get('newImage') as File | null
    const existingImage = formData.get('existingImage') as string

    const galleryItem = await Gallery.findById(params.id)

    if (!galleryItem) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      )
    }

    // Update image if new one is provided
    let imageUrl = existingImage
    if (newImage && newImage.size > 0) {
      imageUrl = await uploadToCloudinary(newImage, 'gallery')
    }

    // Parse tags
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []

    // Update gallery item
    galleryItem.title = title
    galleryItem.description = description
    galleryItem.image = imageUrl
    galleryItem.category = category
    galleryItem.location = location
    galleryItem.date = date || galleryItem.date
    galleryItem.tags = tagsArray
    galleryItem.featured = featured
    galleryItem.active = active

    await galleryItem.save()

    return NextResponse.json({
      success: true,
      gallery: galleryItem
    })
  } catch (error) {
    console.error('Error updating gallery item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update gallery item' },
      { status: 500 }
    )
  }
}

// DELETE - Delete gallery item
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const galleryItem = await Gallery.findByIdAndDelete(params.id)

    if (!galleryItem) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Gallery item deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting gallery item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete gallery item' },
      { status: 500 }
    )
  }
}

