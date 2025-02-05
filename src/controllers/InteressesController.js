const Interesses = require('../models/Interesses');

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
            return res.status(201).json({ message: 'Interesse criado com sucesso', interesse: novoInteresse });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao processar interesse', error: error.message });
    }
};
