const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "strongPassword123"
 *               phone:
 *                 type: string
 *                 example: "+5511999999999"
 *               cpf:
 *                 type: string
 *                 example: "123.456.789-09"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input (e.g., missing fields, invalid email, etc.)
 *       409:
 *         description: Conflict (e.g., email or CPF already exists)
 */
router.post('/auth/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "strongPassword123"
 *     responses:
 *       200:
 *         description: Authentication successful
 */
router.post('/auth/login', authController.login);

module.exports = router;



