import multer from 'multer';

import path from 'path';

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Filter file yang diperbolehkan
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/; // Daftar tipe file yang diizinkan
  const mimetype = fileTypes.test(file.mimetype); // Cek MIME type
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase()); // Cek ekstensi

  if (mimetype && extname) {
    return cb(null, true); // Izinkan file
  }
  cb(new Error('Hanya file gambar yang diperbolehkan!'), false);
};

// Setup multer
const uploadBookImage = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

export default uploadBookImage;
