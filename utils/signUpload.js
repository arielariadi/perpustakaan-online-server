import cloudinary from './cloudinary.js';

const signUpload = async () => {
  const timestamp = Math.round((new Date().getTime() + 3600000) / 1000); // Add 1 hour to account for potential time differences
  const folder = 'images/bookImages';

  const params = {
    timestamp: timestamp,
    folder: folder,
  };

  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_API_SECRET,
  );

  return {
    timestamp,
    signature,
    api_key: process.env.CLOUDINARY_API_KEY,
    folder: folder,
  };
};

export default signUpload;
