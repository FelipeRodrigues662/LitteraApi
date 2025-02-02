const express = require('express');
const router = express.Router();
const generoController = require('../controllers/GenerosController.js');
const authMiddleware = require('../middleware/auth.js');

/**
 * @swagger
 * /api/Generos:
 *   get:
 *     tags: [Generos]
 *     security:
 *       - bearerAuth: []
 *     summary: Get all Generos
 *     responses:
 *       200:
 *         description: A list of Generos
 */
router.get('/Generos', authMiddleware, generoController.getAllGeneros);

module.exports = router;