const Notification = require('../models/Notification.js');
const User = require('../models/User.js');
const Book = require('../models/Book.js');
const sequelize = require('../config/database.js');

exports.createNotification = async (req) => {
    try {
        const bookId = req.body.BookId;
        const interestedUserId = req.body.UserId;     

        const book = await Book.findByPk(bookId, { include: User });

        if (!book) {
            throw new Error('Livro não encontrado');
        }

        const interestedUser = await User.findByPk(interestedUserId);
        if (!interestedUser) {
            throw new Error('Usuário interessado não encontrado');
        }

        const message = `${interestedUser.name} demonstrou interesse no seu livro: ${book.nome}`;

        const notification = await Notification.create({
            UserId: book.ownerBook, 
            BookId: bookId,
            InterestedUserId: interestedUserId,
            message
        });

        return notification; 
    } catch (error) {
        throw new Error('Erro ao criar notificação: ' + error.message);
    }
};

exports.getUserNotifications = async (req, res) => {
    try {
        const userId = req.user.id;

        const notifications = await Notification.findAll({
            where: { UserId: userId },
            include: [
                {
                    model: User,
                    as: 'InterestedUser',
                    attributes: ['id', 'name', 'email', 'phone']
                },
                {
                    model: Book,
                    attributes: ['id', 'nome']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        const interestCount = await Notification.findAll({
            where: { UserId: userId, view: false },
            attributes: [
                'BookId',
                [sequelize.fn('COUNT', sequelize.col('*')), 'interestCount']
            ],
            group: ['BookId']
        });        

        return res.status(200).json({ notifications, interestCount });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar notificações', error: error.message });
    }
};

exports.readNotification = async (req, res) => {
    try {
        const userId = req.user.id; 

        await Notification.update(
            { view: true },
            { where: { UserId: userId } }
        );

        res.status(200).json({ message: 'All notifications marked as read' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating notifications', error: error.message });
    }
};

