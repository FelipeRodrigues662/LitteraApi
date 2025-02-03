const Interesses = require('../models/Interesses');

exports.createOrUpdateInteresses = async (req, res) => {
    try {
        const { bookId } = req.body; // Um único BookId
        const userId = req.user.id;

        if (!bookId) {
            return res.status(400).json({ message: 'O BookId é obrigatório' });
        }

        // Verifica se já existe interesse para o livro
        const interesseExistente = await Interesses.findOne({ where: { UserId: userId, BookId: bookId } });

        if (interesseExistente) {
            // Remove o interesse caso já exista
            await Interesses.destroy({ where: { UserId: userId, BookId: bookId } });
            return res.status(200).json({ message: 'Interesse removido com sucesso' });
        } else {
            // Cria novo interesse
            const novoInteresse = await Interesses.create({ UserId: userId, BookId: bookId });
            return res.status(201).json({ message: 'Interesse criado com sucesso', interesse: novoInteresse });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao processar interesse', error: error.message });
    }
};
