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

// @desc Create a new book
// @route POST /v1/create-book
// @access Public
const createNewBook = asyncHandler(async (req, res) => {
  const { title, author, genre, year, description } = req.body;

  // Ambil nama file dari req.file
  const image = req.file.path.replace(/^.*[\\\/]/, '');
  const relativeImagePath = `images/bookImages/${image}`; // Jalur relatif untuk gambar

  // Confirm data
  if (
    !title ||
    !author ||
    !genre ||
    !year ||
    !description ||
    !relativeImagePath
  ) {
    return res.status(400).json({
      status: 'fail',
      message: 'All fields are required!',
    });
  }

  // Check for duplicate title
  const duplicateTitle = await Book.findOne({ title }).lean().exec();
  if (duplicateTitle) {
    return res.status(409).json({
      status: 'fail',
      message: 'Title already exists!',
    });
  }

  // Create and store a new book
  const book = await Book.create({
    title,
    author,
    genre,
    year,
    description,
    image: relativeImagePath,
  });

  if (book) {
    return res.status(201).json({
      status: 'success',
      message: 'Book created successfully!',
      data: book,
    });
  } else {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid book data received!',
    });
  }
});

export { getBooks, createNewBook };
