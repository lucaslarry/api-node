const express = require("express");
const router = express.Router();
const personController = require("../controller/personController.js");

router.get("/person", personController.getAllPersons);
/**
 * @swagger
 * /persons:
 *   post:
 *     summary: Cria uma nova pessoa
 *     description: Cria uma nova pessoa com nome e idade.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       200:
 *         description: Pessoa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 person:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     age:
 *                       type: number
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
router.post("/person", personController.createPerson);
/**
 * @swagger
 * /persons:
 *   get:
 *     summary: Retorna todas as pessoas
 *     description: Retorna uma lista de todas as pessoas cadastradas.
 *     responses:
 *       200:
 *         description: Lista de pessoas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   age:
 *                     type: number
 *                   profile:
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
const getAllPersons = async (req, res) => {
  try {
    const persons = await Person.find().populate('profile');
    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pessoas' });
  }
};

/**
 * @swagger
 * /persons/{id}:
 *   delete:
 *     summary: Remove uma pessoa pelo ID
 *     description: Remove uma pessoa com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da pessoa a ser removida
 *     responses:
 *       200:
 *         description: Pessoa removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Pessoa não encontrada
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
router.delete("/person/:id", personController.deletePerson);
/**
 * @swagger
 * /persons/{id}:
 *   put:
 *     summary: Atualiza uma pessoa pelo ID
 *     description: Atualiza os dados de uma pessoa com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da pessoa a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       200:
 *         description: Pessoa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 person:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     age:
 *                       type: number
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
 *         description: Pessoa não encontrada
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
router.put("/person/:id", personController.editPerson);

module.exports = router;
