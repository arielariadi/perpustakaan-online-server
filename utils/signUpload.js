import cloudinary from './cloudinary.js';

const signUpload = async () => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: 'images/bookImages',
    },
    process.env.CLOUDINARY_API_SECRET,
  );

  return {
    timestamp,
    signature,
    api_key: process.env.CLOUDINARY_API_KEY,
    folder: 'images/bookImages',
  };
};

export default signUpload;
