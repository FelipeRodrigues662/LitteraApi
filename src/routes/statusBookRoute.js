const express = require('express');
const router = express.Router();
const generoController = require('../controllers/StatusBookController.js');
const authMiddleware = require('../middleware/auth.js');

/**
 * @swagger
 * /api/StatusBook:
 *   get:
 *     tags: [StatusBook]
 *     security:
 *       - bearerAuth: []
 *     summary: Get all StatusBook
 *     responses:
 *       200:
 *         description: A list of StatusBook
 */
router.get('/StatusBook', authMiddleware, generoController.getAllStatusBook);

module.exports = router;