const TypeTransaction = require("../models/TypeTransaction.js")

exports.getAllTypeTransaction = async (req, res) => {
    try {
      const typeTransaction  = await TypeTransaction.findAll();
      res.status(200).json({ TextDecoderypeTransaction });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching TypeTransaction', error: error.message });
    }
};