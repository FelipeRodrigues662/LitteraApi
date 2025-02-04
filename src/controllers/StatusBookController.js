const StatusBook = require("../models/StatusBook.js")

exports.getAllStatusBook = async (req, res) => {
    try {
      const statusBook  = await StatusBook.findAll();
      res.status(200).json({ statusBook });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching StatusBook', error: error.message });
    }
};