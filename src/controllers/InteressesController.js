const Interesses = require('../models/Interesses');
const Book = require('../models/Book.js');
const User = require('../models/User.js');
const Notification = require('./NotificationsController.js');

exports.createOrUpdateInteresses = async (req, res) => {
    try {
        const { bookId } = req.body;
        const userId = req.user.id;

        if (!bookId) {
            return res.status(400).json({ message: 'O BookId é obrigatório' });
        }

        const interesseExistente = await Interesses.findOne({ where: { UserId: userId, BookId: bookId } });

        if (interesseExistente) {
            await Interesses.destroy({ where: { UserId: userId, BookId: bookId } });
            return res.status(200).json({ message: 'Interesse removido com sucesso' });
        } else {
            const novoInteresse = await Interesses.create({ UserId: userId, BookId: bookId });
            const notification = await Notification.createNotification({
                body: {
                    BookId: bookId,
                    UserId: userId
                }
            });            
            return res.status(201).json({ message: 'Interesse criado com sucesso', interesse: novoInteresse, notification: notification });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao processar interesse', error: error.message });
    }
};

exports.getInteressesByUserId = async (req, res) => {
    try {
        const userId = req.user.id;

        const interesses = await Interesses.findAll({
            where: { UserId: userId },
            include: [{ model: Book }]
        });

        const books = interesses.map(interesse => interesse.Book);

        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching interested books', error: error.message });
    }
};

exports.getInteressesAllUsersByBookId = async (req, res) => {
    try {
        const { bookId } = req.params;
        const userId = req.user.id;
        const book = await Book.findOne({
            where: { id: bookId, ownerBook: userId },
            include: [
                {
                    model: Interesses,
                    include: [{ model: User }] 
                }
            ]
        });

        if (!book) {
            return res.status(404).json({ message: 'Book not found or does not belong to the user' });
        }

        const interessados = book.Interesses.map(interesse => ({
            id: interesse.id,
            user: {
                id: interesse.User.id,
                name: interesse.User.name,
                email: interesse.User.email,
                phone: interesse.User.phone
            },
            createdAt: interesse.createdAt
        }));

        res.status(200).json({
            book: {
                id: book.id,
                nome: book.nome,
                ownerBook: book.ownerBook,
                interessados
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching book interests', error: error.message });
    }
};

exports.getInteressesByBookId = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookId } = req.params;

        const interesses = await Interesses.findOne({
            where: { UserId: userId, BookId: bookId },
        });
       
        res.status(200).json(!!interesses );
    } catch (error) {
        res.status(500).json(false);
    }
};