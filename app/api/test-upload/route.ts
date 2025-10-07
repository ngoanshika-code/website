import { NextRequest, NextResponse } from 'next/server'
import { uploadMultipleImages } from '@/lib/imageUpload'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('images') as File[]
    
    if (files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files provided' },
        { status: 400 }
      )
    }
    
    console.log(`Testing upload of ${files.length} images...`)
    
    const uploadedUrls = await uploadMultipleImages(files)
    
    return NextResponse.json({
      success: true,
      message: 'Images uploaded successfully',
      urls: uploadedUrls
    })
  } catch (error) {
    console.error('Test upload failed:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
