const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.js');
const Notification = require('../controllers/NotificationsController.js');

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     tags: [Notificações]
 *     security:
 *       - bearerAuth: []
 *     summary: Listar notificações do usuário logado, com detalhes dos interessados e livros
 *     responses:
 *       200:
 *         description: Lista de notificações do usuário logado
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/notifications', authMiddleware, Notification.getUserNotifications);

module.exports = router;
