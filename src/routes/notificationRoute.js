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

/**
 * @swagger
 * /api/notifications/read:
 *   patch:
 *     tags: [Notificações]
 *     security:
 *       - bearerAuth: []
 *     summary: Marcar todas as notificações do usuário logado como lidas
 *     responses:
 *       200:
 *         description: Todas as notificações foram marcadas como lidas
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.patch('/notifications/read', authMiddleware, Notification.readNotification);

module.exports = router;
