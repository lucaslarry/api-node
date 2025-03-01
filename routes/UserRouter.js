const express = require('express');
const UserController = require('../controllers/UserController.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do usuário (2-50 caracteres, apenas letras e espaços).
 *           example: "João Silva"
 *         email:
 *           type: string
 *           description: Email do usuário (deve ser único e válido).
 *           example: "joao.silva@example.com"
 *         bio:
 *           type: string
 *           description: Biografia do usuário (opcional, máximo 500 caracteres).
 *           example: "Amante de livros clássicos."
 *         profilePicture:
 *           type: string
 *           description: URL da foto de perfil (opcional).
 *           example: "https://example.com/profile.jpg"
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário com nome, email e, opcionalmente, biografia e foto de perfil. Um perfil é criado automaticamente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             name: "João Silva"
 *             email: "joao.silva@example.com"
 *             bio: "Amante de livros clássicos."
 *             profilePicture: "https://example.com/profile.jpg"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Erro de validação ou email já em uso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Nome deve conter apenas letras e espaços."
 *       500:
 *         description: Erro interno no servidor.
 */
router.post('/', UserController.createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Lista todos os usuários
 *     description: Retorna uma lista de todos os usuários.
 *     responses:
 *       200:
 *         description: Lista de usuários.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro interno no servidor.
 */
router.get('/', UserController.getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Obtém um usuário por ID
 *     description: Retorna os detalhes de um usuário específico.
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
router.get('/:id', UserController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - Usuários
 *     summary: Atualiza um usuário
 *     description: Atualiza os dados de um usuário existente.
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
 *             bio: "Amante de livros clássicos."
 *             profilePicture: "https://example.com/profile.jpg"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
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
router.put('/:id', UserController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Usuários
 *     summary: Exclui um usuário
 *     description: Exclui um usuário existente e seu perfil associado.
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
router.delete('/:id', UserController.deleteUser);

module.exports = router;