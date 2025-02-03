const Book = require('../models/Book.js');
const TypeTransaction = require('../models/TypeTransaction.js');
const Genero = require('../models/Genero.js');
const StatusBook = require('../models/StatusBook.js');

exports.createBook = async (req, res) => {
  try {
    const { nome, TypeTransactionId, StatusBookId, value, description, generos } = req.body;
    const ownerBook = req.user.id;
    const book = await Book.create({
      nome,
      TypeTransactionId,
      StatusBookId,
      value,  
      description,
      ownerBook
    });

    if (Array.isArray(generos) && generos.length > 0) {
      const generoInstances = await Genero.findAll({ where: { id: generos } });
      await book.addGeneros(generoInstances);
    }

    res.status(201).json({
      message: 'Book created successfully',
      book
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating book', error: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [
        { model: TypeTransaction, attributes: ['id', 'name'] },
        { model: Genero, attributes: ['id', 'name'], through: { attributes: [] } },
        { model: StatusBook, attributes: ['id', 'name'] }
      ]
    });

    res.status(200).json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findOne({
      where: { id },
      include: [
        { model: TypeTransaction, attributes: ['id', 'name'] },
        { model: Genero, attributes: ['id', 'name'], through: { attributes: [] } },
        { model: StatusBook, attributes: ['id', 'name'] }
      ]
    });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching book', error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, TypeTransactionId, StatusBookId, generos, value, description } = req.body;

    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (nome) book.nome = nome;
    if (TypeTransactionId) book.TypeTransactionId = TypeTransactionId;
    if (StatusBookId) book.StatusBookId = StatusBookId;
    if (value) book.value = value;
    if (description) book.description = description;

    await book.save();

    if (Array.isArray(generos) && generos.length > 0) {
      const generoInstances = await Genero.findAll({ where: { id: generos } });
      await book.setGeneros(generoInstances);
    }

    res.status(200).json({
      message: 'Book updated successfully',
      book
    });
  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
};
