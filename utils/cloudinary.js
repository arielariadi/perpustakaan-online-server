import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Konfigurasi cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Verifikasi konfigurasi
console.log('Cloudinary Configuration:');
console.log('Cloud Name:', cloudinary.config().cloud_name);
console.log('API Key:', cloudinary.config().api_key);
console.log(
  'API Secret:',
  cloudinary.config().api_secret ? '[REDACTED]' : 'Not set',
);

export default cloudinary;
