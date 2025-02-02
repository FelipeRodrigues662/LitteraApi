const express = require('express');
const router = express.Router();
const imagensController = require('../controllers/ImagensController.js');
const authMiddleware = require('../middleware/auth.js');

/**
 * @swagger
 * /api/imagens/{BookId}:
 *   get:
 *     tags: [Imagens]
 *     security:
 *       - bearerAuth: []
 *     summary: Buscar imagens pelo ID do livro
 *     parameters:
 *       - in: path
 *         name: BookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Imagens retornadas com sucesso
 *       404:
 *         description: Nenhuma imagem encontrada
 *       500:
 *         description: Erro ao buscar imagens
 */
router.get('/imagens/:BookId', authMiddleware, imagensController.getImagemByBookId);

/**
 * @swagger
 * /api/imagens:
 *   post:
 *     tags: [Imagens]
 *     security:
 *       - bearerAuth: []
 *     summary: Criar uma nova imagem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 example: "capa_livro.jpg"
 *               fileContent:
 *                 type: string
 *                 format: binary
 *               fileType:
 *                 type: string
 *                 example: "image/jpeg"
 *               BookId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Imagem criada com sucesso
 *       500:
 *         description: Erro ao criar imagem
 */
router.post('/imagens', authMiddleware, imagensController.postImagem);

/**
 * @swagger
 * /api/imagens/{id}:
 *   patch:
 *     tags: [Imagens]
 *     security:
 *       - bearerAuth: []
 *     summary: Atualizar uma imagem existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da imagem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 example: "nova_capa.jpg"
 *               fileContent:
 *                 type: string
 *                 format: binary
 *               fileType:
 *                 type: string
 *                 example: "image/png"
 *               BookId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Imagem atualizada com sucesso
 *       404:
 *         description: Imagem não encontrada
 *       500:
 *         description: Erro ao atualizar imagem
 */
router.patch('/imagens/:id', authMiddleware, imagensController.patchImagem);

/**
 * @swagger
 * /api/imagens/{id}:
 *   delete:
 *     tags: [Imagens]
 *     security:
 *       - bearerAuth: []
 *     summary: Deletar uma imagem pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da imagem
 *     responses:
 *       200:
 *         description: Imagem deletada com sucesso
 *       404:
 *         description: Imagem não encontrada
 *       500:
 *         description: Erro ao deletar imagem
 */
router.delete('/imagens/:id', authMiddleware, imagensController.deleteImagem);

module.exports = router;
