import { NextRequest, NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'

export async function POST() {
  try {
    // Upload a default placeholder image to Cloudinary
    // This is a simple colored rectangle that can serve as a placeholder
    const placeholderImageUrl = 'data:image/svg+xml;base64,' + Buffer.from(`
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#f3f4f6"/>
        <rect x="150" y="100" width="100" height="100" fill="#e5e7eb" rx="8"/>
        <circle cx="175" cy="125" r="15" fill="#d1d5db"/>
        <polygon points="175,145 165,165 185,165" fill="#d1d5db"/>
        <text x="200" y="220" font-family="Arial, sans-serif" font-size="14" fill="#9ca3af">No Image</text>
      </svg>
    `).toString('base64')

    const result = await cloudinary.uploader.upload(placeholderImageUrl, {
      folder: 'donation-campaigns',
      public_id: 'placeholder',
      resource_type: 'image',
      overwrite: true
    })

    return NextResponse.json({
      success: true,
      message: 'Placeholder image uploaded successfully',
      url: result.secure_url
    })
  } catch (error) {
    console.error('Error uploading placeholder image:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
