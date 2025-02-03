const express = require('express');
const router = express.Router();
const bookController = require('../controllers/BookController.js');
const authMiddleware = require('../middleware/auth.js');

/**
 * @swagger
 * /api/books:
 *   post:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - TypeTransactionId
 *               - StatusBookId
 *               - generos
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "The Great Gatsby"
 *               TypeTransactionId:
 *                 type: integer
 *                 example: 1
 *               StatusBookId:
 *                 type: integer
 *                 example: 3
 *               generos:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [2, 3]
 *               value:
 *                  type: decimal
 *                  example: 10.00
 *               description:
 *                  type: string
 *                  example: string
 *     responses:
 *       201:
 *         description: Book created successfully
 */
router.post('/books', authMiddleware, bookController.createBook);

/**
 * @swagger
 * /api/books:
 *   get:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: A list of books
 */
router.get('/books', authMiddleware, bookController.getAllBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 */
router.get('/books/:id', authMiddleware, bookController.getBookById);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Update a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "New Title"
 *               TypeTransactionId:
 *                 type: integer
 *                 example: 2
 *               StatusBookId:
 *                 type: integer
 *                 example: 4
 *               generos:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 4]
 *               value:
 *                  type: decimal
 *                  example: 10.00
 *               description:
 *                  type: string
 *                  example: string
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 */
router.put('/books/:id', authMiddleware, bookController.updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */
router.delete('/books/:id', authMiddleware, bookController.deleteBook);

module.exports = router;
