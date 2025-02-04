const express = require('express');
const router = express.Router();
const preferenciasController = require('../controllers/PreferenciasController.js');
const authMiddleware = require('../middleware/auth.js');

/**
 * @swagger
 * /api/preferencias:
 *   post:
 *     tags: [Preferencias]
 *     security:
 *       - bearerAuth: []
 *     summary: Criar novas preferências para um usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               generos:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       201:
 *         description: Preferências criadas com sucesso
 */
router.post('/preferencias', authMiddleware, preferenciasController.createPreferencias);

/**
 * @swagger
 * /api/preferencias/{userId}:
 *   get:
 *     tags: [Preferencias]
 *     security:
 *       - bearerAuth: []
 *     summary: Buscar todas as preferências de um usuário
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de preferências retornada com sucesso
 *       404:
 *         description: Nenhuma preferência encontrada
 */
router.get('/preferencias/:userId', authMiddleware, preferenciasController.getPreferenciasByUserId);

/**
 * @swagger
 * /api/preferencias/{userId}:
 *   delete:
 *     tags: [Preferencias]
 *     security:
 *       - bearerAuth: []
 *     summary: Deletar todas as preferências de um usuário
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Preferências deletadas com sucesso
 *       404:
 *         description: Nenhuma preferência encontrada para deletar
 */
router.delete('/preferencias/:userId', authMiddleware, preferenciasController.deletePreferenciasByUserId);

module.exports = router;
