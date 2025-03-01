const express = require('express');
const categoryController = require('../controllers/CategoryController');
const router = express.Router();
const Auth = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Nome da categoria (2 a 50 caracteres, apenas letras, hífens e espaços).
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
 * tags:
 *   name: Categorias
 *   description: Gerenciamento de categorias
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     tags:
 *       - Categorias
 *     summary: Cria uma nova categoria
 *     description: Cria uma nova categoria com nome.
 *     security:
 *       - bearerAuth: []
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
 *             example:
 *               name: "Ficção Científica"
 *               books: []
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
router.post('/', Auth, categoryController.createCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *       - Categorias
 *     summary: Lista todas as categorias
 *     description: Retorna uma lista de todas as categorias.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *             example:
 *               - name: "Ficção Científica"
 *                 books: ["64f1b2c8e4b0f5a3d8e7f1a2"]
 *               - name: "Literatura Clássica"
 *                 books: []
 *       500:
 *         description: Erro interno no servidor.
 */
router.get('/', Auth, categoryController.getAllCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     tags:
 *       - Categorias
 *     summary: Obtém uma categoria por ID
 *     description: Retorna os detalhes de uma categoria específica.
 *     security:
 *       - bearerAuth: []
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
 *             example:
 *               name: "Ficção Científica"
 *               books: ["64f1b2c8e4b0f5a3d8e7f1a2"]
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
router.get('/:id', Auth, categoryController.getCategoryById);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     tags:
 *       - Categorias
 *     summary: Atualiza uma categoria
 *     description: Atualiza os dados de uma categoria existente.
 *     security:
 *       - bearerAuth: []
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
 *             example:
 *               name: "Ficção Científica e Fantasia"
 *               books: ["64f1b2c8e4b0f5a3d8e7f1a2"]
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
router.put('/:id', Auth, categoryController.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags:
 *       - Categorias
 *     summary: Exclui uma categoria
 *     description: Exclui uma categoria existente.
 *     security:
 *       - bearerAuth: []
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
router.delete('/:id', Auth, categoryController.deleteCategory);

module.exports = router;