const express = require('express');
const categoryController = require('../controllers/CategoryController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Gerenciamento de categorias
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Nome da categoria.
 *           example: "Ficção Científica"
 *         books:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de IDs dos livros associados à categoria.
 *           example: ["64f1b2c8e4b0f5a3d8e7f1a2"]
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     tags:
 *       - Categorias
 *     summary: Cria uma nova categoria
 *     description: Cria uma nova categoria com nome.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *           example:
 *             name: "Ficção Científica"
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Erro de validação ou categoria já existe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Esta categoria já existe."
 *       500:
 *         description: Erro interno no servidor.
 */
router.post('/', categoryController.createCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *       - Categorias
 *     summary: Lista todas as categorias
 *     description: Retorna uma lista de todas as categorias.
 *     responses:
 *       200:
 *         description: Lista de categorias.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Erro interno no servidor.
 */
router.get('/', categoryController.getAllCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     tags:
 *       - Categorias
 *     summary: Obtém uma categoria por ID
 *     description: Retorna os detalhes de uma categoria específica.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria.
 *     responses:
 *       200:
 *         description: Detalhes da categoria.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoria não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Categoria não encontrada."
 *       500:
 *         description: Erro interno no servidor.
 */
router.get('/:id', categoryController.getCategoryById);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     tags:
 *       - Categorias
 *     summary: Atualiza uma categoria
 *     description: Atualiza os dados de uma categoria existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *           example:
 *             name: "Ficção Científica e Fantasia"
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Erro de validação ou categoria já existe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Esta categoria já existe."
 *       404:
 *         description: Categoria não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Categoria não encontrada."
 *       500:
 *         description: Erro interno no servidor.
 */
router.put('/:id', categoryController.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags:
 *       - Categorias
 *     summary: Exclui uma categoria
 *     description: Exclui uma categoria existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria.
 *     responses:
 *       204:
 *         description: Categoria excluída com sucesso.
 *       404:
 *         description: Categoria não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Categoria não encontrada."
 *       500:
 *         description: Erro interno no servidor.
 */
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;