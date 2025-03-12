const express = require('express');
const UserController = require('../controllers/UserController.js');
const Auth = require('../middlewares/Auth');

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
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do usuário.
 *           example: "João Silva"
 *         email:
 *           type: string
 *           description: Email do usuário (deve ser único e válido).
 *           example: "joao.silva@example.com"
 *         password:
 *           type: string
 *           description: Senha do usuário (mínimo 6 caracteres).
 *           example: "senha123"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação do usuário.
 *           example: "2023-09-01T12:00:00.000Z"
 */


/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Lista todos os usuários
 *     description: Retorna uma lista de todos os usuários.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             example:
 *               - name: "João Silva"
 *                 email: "joao.silva@example.com"
 *                 created_at: "2023-09-01T12:00:00.000Z"
 *               - name: "Maria Oliveira"
 *                 email: "maria.oliveira@example.com"
 *                 created_at: "2023-09-01T12:30:00.000Z"
 *       500:
 *         description: Erro interno no servidor.
 */
router.get('/', Auth, UserController.getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Obtém um usuário por ID
 *     description: Retorna os detalhes de um usuário específico.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário.
 *     responses:
 *       200:
 *         description: Detalhes do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               name: "João Silva"
 *               email: "joao.silva@example.com"
 *               created_at: "2023-09-01T12:00:00.000Z"
 *       404:
 *         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuário não encontrado."
 *       500:
 *         description: Erro interno no servidor.
 */
router.get('/:id', Auth, UserController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - Usuários
 *     summary: Atualiza um usuário
 *     description: Atualiza os dados de um usuário existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             name: "João Silva"
 *             email: "joao.silva@example.com"
 *             password: "novaSenha123"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               name: "João Silva"
 *               email: "joao.silva@example.com"
 *               created_at: "2023-09-01T12:00:00.000Z"
 *       400:
 *         description: Erro de validação ou email já em uso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email já está em uso."
 *       404:
 *         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuário não encontrado."
 *       500:
 *         description: Erro interno no servidor.
 */
router.put('/:id', Auth, UserController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Usuários
 *     summary: Exclui um usuário
 *     description: Exclui um usuário existente e seu perfil associado.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário.
 *     responses:
 *       204:
 *         description: Usuário excluído com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuário não encontrado."
 *       500:
 *         description: Erro interno no servidor.
 */
router.delete('/:id', Auth, UserController.deleteUser);

module.exports = router;