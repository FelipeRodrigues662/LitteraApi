const Book = require('../models/Book.js');
const TypeTransaction = require('../models/TypeTransaction.js');
const Genero = require('../models/Genero.js');
const StatusBook = require('../models/StatusBook.js');
const Imagens = require('../models/Imagems.js');

exports.createBook = async (req, res) => {
  try {
    const { nome, TypeTransactionId, StatusBookId, value, description, generos, cidade, isActive } = req.body;
    const ownerBook = req.user.id;
    const book = await Book.create({
      nome,
      TypeTransactionId,
      StatusBookId,
      value,  
      description,
      ownerBook,
      cidade,
      isActive
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
        { model: StatusBook, attributes: ['id', 'name'] },
        { 
          model: Imagens, 
          as: 'imagens', 
          attributes: ['id'], 
          limit: 1 
        }
      ]
    });

    const host = req.get('host');
    const protocol = req.protocol;

    const booksWithImageUrls = books.map(book => ({
      ...book.toJSON(),
      imagens: book.imagens.length > 0 
        ? `${protocol}://${host}/api/imagens/url/${book.imagens[0].id}` 
        : null
    }));

    res.status(200).json({ books: booksWithImageUrls });
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
        { model: StatusBook, attributes: ['id', 'name'] },
        { 
          model: Imagens, 
          as: 'imagens', 
          attributes: ['id'] 
        }
      ]
    });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const host = req.get('host');
    const protocol = req.protocol;

    const bookWithImageUrls = {
      ...book.toJSON(),
      imagens: book.imagens.length > 0 
        ? book.imagens.map(img => `${protocol}://${host}/api/imagens/url/${img.id}`) 
        : []
    };

    res.status(200).json({ book: bookWithImageUrls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching book', error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, TypeTransactionId, StatusBookId, generos, value, description, cidade, isActive } = req.body;

    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (nome !== undefined) book.nome = nome;
    if (TypeTransactionId !== undefined) book.TypeTransactionId = TypeTransactionId;
    if (StatusBookId !== undefined) book.StatusBookId = StatusBookId;
    if (value !== undefined) book.value = value;
    if (description !== undefined) book.description = description;
    if (cidade !== undefined) book.cidade = cidade;
    if (isActive !== undefined) book.isActive = isActive;

    await book.save();

    if (Array.isArray(generos)) {
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



