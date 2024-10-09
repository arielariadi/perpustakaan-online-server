import Book from '../models/bookModel.js';

import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

import fs from 'fs';
import path from 'path';

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

// @desc Get a single book
// @route GET /v1/books/:id
// @access Public
const getSingleBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID!' });
  }

  const book = await Book.findById(id).lean();

  if (!book) {
    return res.status(404).json({ message: 'Book not found!' });
  }

  res.status(200).json({
    status: 'success',
    message: 'Book fetched successfully',
    data: book,
  });
});

// @desc Create a new book
// @route POST /v1/create-book
// @access Public
const createNewBook = asyncHandler(async (req, res) => {
  const { title, author, genre, year, description } = req.body;

  if (!req.file) {
    return res.status(400).json({
      status: 'fail',
      message: 'Image is required!',
    });
  }

  // Ambil nama file dari req.file
  const image = req.file.path.replace(/^.*[\\\/]/, '');
  const relativeImagePath = `images/bookImages/${image}`; // Jalur relatif untuk gambar

  // Confirm data
  if (!title || !author || !genre || !year || !description) {
    return res.status(400).json({
      status: 'fail',
      message: 'All fields are required!',
    });
  }

  // Validasi year sebagai angka
  const yearAsNumber = Number(year);
  if (
    isNaN(yearAsNumber) ||
    yearAsNumber < 1000 ||
    yearAsNumber > new Date().getFullYear()
  ) {
    return res.status(400).json({
      status: 'fail',
      message: ' Year must be a valid year!',
    });
  }

  // Cek untuk duplikat title
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
    year: yearAsNumber,
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

// @desc Update a book
// @route PATCH /v1/books/:id
// @access Public
const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID!' });
  }

  const updateData = { ...req.body };

  // Jika ada gambar baru, ambil pathnya
  if (req.file) {
    updateData.image = `images/bookImages/${req.file.filename}`;
  }

  const book = await Book.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });

  if (!book) {
    return res.status(404).json({ message: 'Book not found!' });
  }

  res.status(200).json({
    status: 'success',
    message: 'Book updated successfully',
    data: book,
  });
});

// @desc Delete a book
// @route DELETE /v1/delete-book
// @access Public
const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID!' });
  }

  const book = await Book.findById(id).exec();

  if (!book) {
    return res.status(404).json({ message: 'Book not found!' });
  }

  // Path lengkap gambar yang akan dihapus
  const imagePath = path.join(
    'public',
    'images',
    'bookImages',
    path.basename(book.image),
  );

  // Hapus gambar
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error('Error deleting image:', err);
      return res.status(500).json({
        status: 'fail',
        message: 'Failed to delete image!',
      });
    }
  });

  // Hapus book
  await book.deleteOne();

  const reply = `Buku dengan title ${book.title} telah di hapus!`;

  res.status(200).json({
    status: 'success',
    message: reply,
  });
});

export { getBooks, getSingleBook, createNewBook, updateBook, deleteBook };
