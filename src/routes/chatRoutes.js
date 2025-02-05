const express = require('express');
const router = express.Router();
const chatController = require('../controllers/gptController.js');
const authMiddleware = require('../middleware/auth.js');

/**
 * @swagger
 * /api/chat/prompt:
 *   post:
 *     tags: [Chat]
 *     summary: Envia um prompt e recebe uma recomendação de livros
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna uma lista de livros recomendados
 *       400:
 *         description: Campo obrigatório ausente
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/chat/prompt', authMiddleware, chatController.postPrompt);

module.exports = router;
