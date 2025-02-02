const Preferencias = require('../models/Preferencias.js');

exports.createPreferencias = async (req, res) => {
  try {
    const { generos } = req.body;
    const userId = req.user.id;
    
    if (!Array.isArray(generos) || generos.length === 0) {
      return res.status(400).json({ message: 'A lista de gêneros deve ser um array e não pode estar vazia' });
    }

    const preferencias = await Promise.all(
      generos.map(async (GeneroId) => {
        return await Preferencias.create({ userId, GeneroId });
      })
    );

    res.status(201).json({ message: 'Preferências criadas com sucesso', preferencias });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar preferências', error: error.message });
  }
};

exports.getPreferenciasByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const preferencias = await Preferencias.findAll({ where: { userId } });
    if (preferencias.length === 0) {
      return res.status(404).json({ message: 'Nenhuma preferência encontrada para este usuário' });
    }
    res.status(200).json({ preferencias });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar preferências', error: error.message });
  }
};

exports.deletePreferenciasByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedCount = await Preferencias.destroy({ where: { userId } });
    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Nenhuma preferência encontrada para deletar' });
    }
    res.status(200).json({ message: 'Preferências deletadas com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar preferências', error: error.message });
  }
};