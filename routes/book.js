import express from 'express';
const router = express.Router();

import uploadBookImage from '../middleware/uploadBookImageMiddleware.js';
import {
  getBooks,
  getSingleBook,
  createNewBook,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js';

router.get('/books', getBooks);
router.get('/books/:id', getSingleBook);
router.post('/books', uploadBookImage.single('image'), createNewBook);
router.patch('/books/:id', uploadBookImage.single('image'), updateBook);
router.delete('/books/:id', deleteBook);

export default router;
