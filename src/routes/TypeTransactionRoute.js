const express = require('express');
const router = express.Router();
const generoController = require('../controllers/TypeTransactionController.js');
const authMiddleware = require('../middleware/auth.js');

/**
 * @swagger
 * /api/TypeTransaction:
 *   get:
 *     tags: [TypeTransaction]
 *     security:
 *       - bearerAuth: []
 *     summary: Get all TypeTransaction
 *     responses:
 *       200:
 *         description: A list of TypeTransaction
 */
router.get('/TypeTransaction', authMiddleware, generoController.getAllTypeTransaction);

module.exports = router;