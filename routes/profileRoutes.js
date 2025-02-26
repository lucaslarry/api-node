const express = require("express");
const router = express.Router();
const profileController = require("../controller/profileController.js");
/**
 * @swagger
 * /profiles:
 *   get:
 *     summary: Retorna todos os perfis
 *     description: Retorna uma lista de todos os perfis cadastrados, com os dados da pessoa associada.
 *     responses:
 *       200:
 *         description: Lista de perfis retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   occupation:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   address:
 *                     type: string
 *                   person:
 *                     type: object
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get("/profile", profileController.getAllProfiles);
/**
 * @swagger
 * /profiles:
 *   post:
 *     summary: Cria um novo perfil
 *     description: Cria um novo perfil com ocupação, telefone, endereço e ID da pessoa associada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               occupation:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               personId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Perfil criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 profile:
 *                   type: object
 *                   properties:
 *                     occupation:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *                     person:
 *                       type: string
 *       400:
 *         description: Erro de validação ou dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/profile", profileController.createProfile);
/**
 * @swagger
 * /profiles/{id}:
 *   delete:
 *     summary: Remove um perfil pelo ID
 *     description: Remove um perfil com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do perfil a ser removido
 *     responses:
 *       200:
 *         description: Perfil removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Perfil não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete("/profile/:id", profileController.deleteProfile);
/**
 * @swagger
 * /profiles/{id}:
 *   put:
 *     summary: Atualiza um perfil pelo ID
 *     description: Atualiza os dados de um perfil com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do perfil a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               occupation:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               personId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 profile:
 *                   type: object
 *                   properties:
 *                     occupation:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *                     person:
 *                       type: string
 *       400:
 *         description: Erro de validação ou dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: Perfil não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put("/profile/:id", profileController.editProfile);

module.exports = router;
