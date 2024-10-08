import express from 'express';
const router = express.Router();

import uploadBookImage from '../middleware/uploadBookImageMiddleware.js';
import { getBooks, createNewBook } from '../controllers/bookController.js';

router.get('/books', getBooks);
router.post('/create-book', uploadBookImage.single('image'), createNewBook);

export default router;
