const Book = require('../models/Book.js');

exports.createBook = async (req, res) => {
  try {
    const { nome, TypeTrasactionId, GeneroId, StatusBookId } = req.body;

    const book = await Book.create({
      nome,
      TypeTrasactionId,
      GeneroId,
      StatusBookId
    });

    res.status(201).json({
      message: 'Book created successfully',
      book
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, TypeTrasactionId, GeneroId, StatusBookId } = req.body;

    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.nome = nome || book.nome;
    book.TypeTrasactionId = TypeTrasactionId || book.TypeTrasactionId;
    book.GeneroId = GeneroId || book.GeneroId;
    book.StatusBookId = StatusBookId || book.StatusBookId;

    await book.save();

    res.status(200).json({
      message: 'Book updated successfully',
      book
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await book.destroy();
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
};