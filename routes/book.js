import express from 'express';
const router = express.Router();

import uploadBookImage from '../middleware/uploadBookImageMiddleware.js';
import {
  getBooks,
  getSingleBook,
  createNewBook,
  updateBook,
} from '../controllers/bookController.js';

router.get('/books', getBooks);
router.get('/books/:id', getSingleBook);
router.post('/create-book', uploadBookImage.single('image'), createNewBook);
router.patch('/update-book/:id', uploadBookImage.single('image'), updateBook);

export default router;
