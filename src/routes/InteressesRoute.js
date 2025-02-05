const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.js');
const interessesController = require('../controllers/InteressesController.js');

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

/**
 * @swagger
 * /api/interesses:
 *   get:
 *     tags: [Interesses]
 *     security:
 *       - bearerAuth: []
 *     summary: Listar todos os livros que o usuário tem interesse
 *     responses:
 *       200:
 *         description: Lista de livros que o usuário tem interesse
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: "O Senhor dos Anéis"
 *                   ownerBook:
 *                     type: integer
 *                     example: 2
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao buscar os interesses
 */
router.get('/interesses', authMiddleware, interessesController.getInteressesByUserId);

/**
 * @swagger
 * /api/interesses/{bookId}:
 *   get:
 *     tags: [Interesses]
 *     security:
 *       - bearerAuth: []
 *     summary: Listar todos os interessados em um livro específico
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Lista de usuários interessados no livro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 book:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nome:
 *                       type: string
 *                       example: "O Senhor dos Anéis"
 *                     interessados:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 3
 *                           name:
 *                             type: string
 *                             example: "João Silva"
 *                           email:
 *                             type: string
 *                             example: "joao@email.com"
 *       400:
 *         description: ID do livro inválido
 *       404:
 *         description: Livro não encontrado
 *       500:
 *         description: Erro ao buscar interessados
 */
router.get('/interesses/:bookId', authMiddleware, interessesController.getInteressesAllUsersByBookId);

/**
 * @swagger
 * /api/interesses/bookId/{bookId}:
 *   get:
 *     tags: [Interesses]
 *     security:
 *       - bearerAuth: []
 *     summary: Lista se o usuário tem interrese no livro
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Lista se o usuário tem interrese no livro 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: "O Senhor dos Anéis"
 *                   ownerBook:
 *                     type: integer
 *                     example: 2
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao buscar os interesses
 */
router.get('/interesses/bookId/:bookId', authMiddleware, interessesController.getInteressesByBookId);

module.exports = router;
