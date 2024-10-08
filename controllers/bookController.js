import Book from '../models/bookModel.js';

import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

// @desc Get all books
// @route GET /v1/books
// @access Public
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find().lean();

  if (!books || books.length === 0) {
    return res.status(400).json({ message: 'No books found!' });
  }

  res.status(200).json({
    status: 'success',
    message: 'Books fetched successfully',
    data: books,
  });
});

export { getBooks };
