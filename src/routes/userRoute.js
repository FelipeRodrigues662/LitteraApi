const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.js');
const authMiddleware = require('../middleware/auth.js');

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     summary: Buscar um usuário por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário retornado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/users/:id', authMiddleware, userController.getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     summary: Atualizar um usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/users/:id', authMiddleware, userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     summary: Deletar um usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/users/:id', authMiddleware, userController.deleteUser);

module.exports = router;
