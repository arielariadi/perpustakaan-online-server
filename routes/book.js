import express from 'express';
const router = express.Router();

import { getBooks } from '../controllers/bookController.js';

router.get('/books', getBooks);

export default router;
