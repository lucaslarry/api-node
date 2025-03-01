const express = require('express');
const ProfileController = require('../controllers/ProfileController.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Perfis
 *   description: Gerenciamento de perfis de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       required:
 *         - user
 *       properties:
 *         user:
 *           type: string
 *           description: ID do usuário associado ao perfil.
 *           example: "64f1b2c8e4b0f5a3d8e7f1a2"
 *         bio:
 *           type: string
 *           description: Biografia do usuário (máximo 500 caracteres).
 *           example: "Apaixonado por tecnologia e desenvolvimento."
 *         profilePicture:
 *           type: string
 *           description: URL da foto de perfil do usuário.
 *           example: "default-profile.jpg"
 */

/**
 * @swagger
 * /profiles:
 *   post:
 *     tags:
 *       - Perfis
 *     summary: Cria um novo perfil
 *     description: Cria um novo perfil para um usuário existente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *           example:
 *             user: "64f1b2c8e4b0f5a3d8e7f1a2"
 *             bio: "Apaixonado por tecnologia e desenvolvimento."
 *             profilePicture: "default-profile.jpg"
 *     responses:
 *       201:
 *         description: Perfil criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Erro de validação ou usuário já possui um perfil.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Este usuário já possui um perfil."
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
router.post('/', ProfileController.createProfile);

/**
 * @swagger
 * /profiles/{userId}:
 *   get:
 *     tags:
 *       - Perfis
 *     summary: Obtém um perfil por ID do usuário
 *     description: Retorna os detalhes de um perfil específico.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário associado ao perfil.
 *     responses:
 *       200:
 *         description: Detalhes do perfil.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Perfil não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Perfil não encontrado."
 *       500:
 *         description: Erro interno no servidor.
 */
router.get('/:userId', ProfileController.getProfileByUserId);

/**
 * @swagger
 * /profiles/{userId}:
 *   put:
 *     tags:
 *       - Perfis
 *     summary: Atualiza um perfil
 *     description: Atualiza os dados de um perfil existente.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário associado ao perfil.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *           example:
 *             bio: "Apaixonado por tecnologia, desenvolvimento e livros."
 *             profilePicture: "new-profile.jpg"
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Erro de validação.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "A biografia deve ter no máximo 500 caracteres."
 *       404:
 *         description: Perfil não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Perfil não encontrado."
 *       500:
 *         description: Erro interno no servidor.
 */
router.put('/:userId', ProfileController.updateProfile);

/**
 * @swagger
 * /profiles/{userId}:
 *   delete:
 *     tags:
 *       - Perfis
 *     summary: Exclui um perfil
 *     description: Exclui um perfil existente e remove a referência no usuário associado.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário associado ao perfil.
 *     responses:
 *       204:
 *         description: Perfil excluído com sucesso.
 *       404:
 *         description: Perfil não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Perfil não encontrado."
 *       500:
 *         description: Erro interno no servidor.
 */
router.delete('/:userId', ProfileController.deleteProfile);

module.exports = router;