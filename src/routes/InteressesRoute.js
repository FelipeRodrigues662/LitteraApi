const express = require('express');
const router = express.Router();
const interessesController = require('../controllers/InteressesController.js');
const authMiddleware = require('../middleware/auth.js');

/**
 * @swagger
 * /api/interesses:
 *   post:
 *     tags: [Interesses]
 *     security:
 *       - bearerAuth: []
 *     summary: Criar ou remover interesse de um usuário para um livro específico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Interesse criado com sucesso
 *       200:
 *         description: Interesse removido com sucesso
 *       400:
 *         description: O BookId é obrigatório
 *       500:
 *         description: Erro ao processar interesse
 */
router.post('/interesses', authMiddleware, interessesController.createOrUpdateInteresses);

module.exports = router;
