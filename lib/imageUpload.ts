import cloudinary from '@/lib/cloudinary'

export async function uploadImageToCloudinary(file: File, folder: string = 'donation-campaigns'): Promise<string> {
  try {
    // Convert File to Buffer for server-side upload
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    const result = await cloudinary.uploader.upload(
      `data:${file.type};base64,${buffer.toString('base64')}`,
      {
        folder: folder,
        public_id: `${folder}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        resource_type: 'image',
      }
    )
    return result.secure_url
  } catch (error) {
    throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Alias for backward compatibility
export async function uploadToCloudinary(file: File, folder: string = 'donation-campaigns'): Promise<string> {
  return uploadImageToCloudinary(file, folder)
}

export async function uploadMultipleImages(files: File[]): Promise<string[]> {
  const uploadPromises = files.map(file => uploadImageToCloudinary(file))
  return Promise.all(uploadPromises)
}

export function getDefaultPlaceholderImage(): string {
  // Return a default placeholder image URL from Cloudinary
  return 'https://res.cloudinary.com/djyp5yzil/image/upload/v1759814188/donation-campaigns/placeholder.svg'
}