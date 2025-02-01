const Preferencias = require('../models/Preferencias.js');

exports.createPreferencia = async (req, res) => {
  try {
    const { name } = req.body;
    const preferencia = await Preferencias.create({ name });
    res.status(201).json({ message: 'Preferência criada com sucesso', preferencia });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar preferência', error: error.message });
  }
};

exports.getAllPreferencias = async (req, res) => {
  try {
    const preferencias = await Preferencias.findAll();
    res.status(200).json({ preferencias });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar preferências', error: error.message });
  }
};

exports.getPreferenciaById = async (req, res) => {
  try {
    const { id } = req.params;
    const preferencia = await Preferencias.findByPk(id);
    if (!preferencia) {
      return res.status(404).json({ message: 'Preferência não encontrada' });
    }
    res.status(200).json({ preferencia });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar preferência', error: error.message });
  }
};

exports.updatePreferencia = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const preferencia = await Preferencias.findByPk(id);
    if (!preferencia) {
      return res.status(404).json({ message: 'Preferência não encontrada' });
    }
    preferencia.name = name || preferencia.name;
    await preferencia.save();
    res.status(200).json({ message: 'Preferência atualizada com sucesso', preferencia });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar preferência', error: error.message });
  }
};

exports.deletePreferencia = async (req, res) => {
  try {
    const { id } = req.params;
    const preferencia = await Preferencias.findByPk(id);
    if (!preferencia) {
      return res.status(404).json({ message: 'Preferência não encontrada' });
    }
    await preferencia.destroy();
    res.status(200).json({ message: 'Preferência deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar preferência', error: error.message });
  }
};