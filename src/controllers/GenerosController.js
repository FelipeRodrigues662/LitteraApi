const Genero = require("../models/Genero.js")

exports.getAllGeneros = async (req, res) => {
    try {
      const genero  = await Genero.findAll();
      res.status(200).json({ genero });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching Genero', error: error.message });
    }
};