import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Gallery from '@/models/Gallery'
import { uploadToCloudinary } from '@/lib/imageUpload'

// GET - Fetch all gallery items
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const active = searchParams.get('active')

    let query: any = {}
    
    if (category && category !== 'all') {
      query.category = category
    }
    
    if (featured === 'true') {
      query.featured = true
    }
    
    if (active !== 'false') {
      query.active = true
    }

    const galleryItems = await Gallery.find(query)
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({
      success: true,
      gallery: galleryItems
    })
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery items' },
      { status: 500 }
    )
  }
}

// POST - Create new gallery item
export async function POST(request: NextRequest) {
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
    const image = formData.get('image') as File

    // Validate required fields
    if (!title || !description || !category || !location || !image) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Upload image to Cloudinary
    let imageUrl = ''
    if (image) {
      imageUrl = await uploadToCloudinary(image, 'gallery')
    }

    // Parse tags
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []

    // Create gallery item
    const galleryItem = await Gallery.create({
      title,
      description,
      image: imageUrl,
      category,
      location,
      date: date || new Date(),
      tags: tagsArray,
      featured,
      active: true
    })

    return NextResponse.json({
      success: true,
      gallery: galleryItem
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating gallery item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create gallery item' },
      { status: 500 }
    )
  }
}

