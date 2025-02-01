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
 *     summary: Criar uma nova preferência
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ficção"
 *     responses:
 *       201:
 *         description: Preferência criada com sucesso
 */
router.post('/preferencias', authMiddleware, preferenciasController.createPreferencia);

/**
 * @swagger
 * /api/preferencias:
 *   get:
 *     tags: [Preferencias]
 *     security:
 *       - bearerAuth: []
 *     summary: Buscar todas as preferências
 *     responses:
 *       200:
 *         description: Lista de preferências retornada com sucesso
 */
router.get('/preferencias', authMiddleware, preferenciasController.getAllPreferencias);

/**
 * @swagger
 * /api/preferencias/{id}:
 *   get:
 *     tags: [Preferencias]
 *     security:
 *       - bearerAuth: []
 *     summary: Buscar uma preferência por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da preferência
 *     responses:
 *       200:
 *         description: Preferência retornada com sucesso
 *       404:
 *         description: Preferência não encontrada
 */
router.get('/preferencias/:id', authMiddleware, preferenciasController.getPreferenciaById);

/**
 * @swagger
 * /api/preferencias/{id}:
 *   put:
 *     tags: [Preferencias]
 *     security:
 *       - bearerAuth: []
 *     summary: Atualizar uma preferência
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da preferência
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Suspense"
 *     responses:
 *       200:
 *         description: Preferência atualizada com sucesso
 *       404:
 *         description: Preferência não encontrada
 */
router.put('/preferencias/:id', authMiddleware, preferenciasController.updatePreferencia);

/**
 * @swagger
 * /api/preferencias/{id}:
 *   delete:
 *     tags: [Preferencias]
 *     security:
 *       - bearerAuth: []
 *     summary: Deletar uma preferência
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da preferência
 *     responses:
 *       200:
 *         description: Preferência deletada com sucesso
 *       404:
 *         description: Preferência não encontrada
 */
router.delete('/preferencias/:id', authMiddleware, preferenciasController.deletePreferencia);

module.exports = router;
