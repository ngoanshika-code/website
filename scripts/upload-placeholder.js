const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'djyp5yzil',
  api_key: '235565132731882',
  api_secret: '9AGySFreusnx338-TIpZ7D_7bVs'
});

// Create a simple SVG placeholder
const placeholderSvg = `
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="300" fill="#f3f4f6"/>
  <rect x="150" y="100" width="100" height="100" fill="#e5e7eb" rx="8"/>
  <circle cx="175" cy="125" r="15" fill="#d1d5db"/>
  <polygon points="175,145 165,165 185,165" fill="#d1d5db"/>
  <text x="200" y="220" font-family="Arial, sans-serif" font-size="14" fill="#9ca3af">No Image</text>
</svg>
`;

async function uploadPlaceholder() {
  try {
    const result = await cloudinary.uploader.upload(
      `data:image/svg+xml;base64,${Buffer.from(placeholderSvg).toString('base64')}`,
      {
        folder: 'donation-campaigns',
        public_id: 'placeholder',
        resource_type: 'image',
        overwrite: true
      }
    );
    
    console.log('Placeholder uploaded successfully:', result.secure_url);
  } catch (error) {
    console.error('Error uploading placeholder:', error);
  }
}

uploadPlaceholder();
