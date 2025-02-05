const { Op } = require('sequelize');
const Preferencias = require('../models/Preferencias'); 
const Genero = require('../models/Genero.js')

exports.createPreferencias = async (req, res) => {
  try {
    const { generos } = req.body;
    const userId = req.user.id;

    if (!Array.isArray(generos)) {
      return res.status(400).json({ message: 'A lista de gêneros deve ser um array' });
    }

    const preferenciasCriadasOuAtualizadas = await Promise.all(
      generos.map(async (GeneroId) => {
        const [preferencia] = await Preferencias.findOrCreate({
          where: { UserId: userId, GeneroId },
          defaults: { UserId: userId, GeneroId },
        });
        return preferencia;
      })
    );

    await Preferencias.destroy({
      where: {
        UserId: userId,
        GeneroId: { [Op.notIn]: generos },
      },
    });

    res.status(201).json({
      message: 'Preferências atualizadas com sucesso',
      preferencias: preferenciasCriadasOuAtualizadas,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao processar preferências', error: error.message });
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

exports.getPreferenciasPrompt = async (userId) => {
  try {
    const preferencias = await Preferencias.findAll({
      where: { UserId: userId },
      include: [{ model: Genero, attributes: ['name'] }] 
    });

    if (preferencias.length === 0) {
      return null;
    }

    const generos = preferencias.map(pref => pref.Genero.name);
    return generos; 
  } catch (error) {
    console.error('Erro ao buscar preferências:', error);
    throw error; 
  }
};
