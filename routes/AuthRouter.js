const express = require('express');
const authController = require('../controllers/AuthController');
const userController = require('../controllers/UserController');
const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "João Silva"
 *         email:
 *           type: string
 *           example: "joao@example.com"
 *         password:
 *           type: string
 *           example: "senha123"
 */

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Registro e login de usuários
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Registra um novo usuário
 *     description: Cria um novo usuário com nome, e-mail e senha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao@example.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               name: "João Silva"
 *               email: "joao@example.com"
 *               password: "senha123"
 *       400:
 *         description: E-mail já em uso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Este e-mail já está em uso."
 *       500:
 *         description: Erro interno no servidor.
 */
router.post('/register', userController.createUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Faz login de um usuário
 *     description: Autentica um usuário com e-mail e senha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "joao@example.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *             example:
 *               user:
 *                 name: "João Silva"
 *                 email: "joao@example.com"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: E-mail ou senha incorretos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "E-mail ou senha incorretos."
 *       500:
 *         description: Erro interno no servidor.
 */
router.post('/login', authController.login);

module.exports = router;