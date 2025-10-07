import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'djyp5yzil',
  api_key: process.env.CLOUDINARY_API_KEY || '235565132731882',
  api_secret: process.env.CLOUDINARY_API_SECRET || '9AGySFreusnx338-TIpZ7D_7bVs',
})

export default cloudinary
