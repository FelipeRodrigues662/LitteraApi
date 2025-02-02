const Imagens = require('../models/Imagems.js');

exports.getImagemByBookId = async (req, res) => {
    try {
        const { BookId } = req.params;

        const imagens = await Imagens.findAll({ 
            where: { BookId },
        });

        if (!imagens || imagens.length === 0) {
            return res.status(404).json({ message: 'Nenhuma imagem encontrada para este BookId' });
        }

        res.status(200).json({ imagens });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar imagens', error: error.message });
    }
};

exports.postImagem = async (req, res) => {
    try {
        const { fileName, fileContent, fileType, BookId } = req.body;

        const novaImagem = await Imagens.create({
            fileName,
            fileContent,
            fileType,
            BookId
        });

        res.status(201).json({ message: 'Imagem criada com sucesso!', data: novaImagem });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar Imagem', error: error.message });
    }   
};

exports.patchImagem = async (req, res) => {
    try {
        const { id } = req.params;
        const { fileName, fileContent, fileType, BookId } = req.body;

        const imagem = await Imagens.findByPk(id);
        if (!imagem) {
            return res.status(404).json({ message: 'Imagem não encontrada' });
        }

        imagem.fileName = fileName || imagem.fileName;
        imagem.fileContent = fileContent || imagem.fileContent;
        imagem.fileType = fileType || imagem.fileType;
        imagem.BookId = BookId || imagem.BookId;

        await imagem.save();

        res.status(200).json({ message: 'Imagem atualizada com sucesso', data: imagem });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar Imagem', error: error.message });
    }   
};

exports.deleteImagem = async (req, res) => {
    try {
        const { id } = req.params;

        const imagem = await Imagens.findByPk(id);
        if (!imagem) {
            return res.status(404).json({ message: 'Imagem não encontrada' });
        }

        await imagem.destroy();
        res.status(200).json({ message: 'Imagem deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar Imagem', error: error.message });
    }
};
