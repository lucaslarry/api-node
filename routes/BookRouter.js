const express = require('express');
const bookController = require('../controllers/BookController');
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
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - categories
 *       properties:
 *         title:
 *           type: string
 *           description: Título do livro (2 a 200 caracteres, apenas letras, números e caracteres especiais comuns).
 *           example: "Dom Quixote"
 *         author:
 *           type: string
 *           description: Autor do livro (2 a 100 caracteres, apenas letras e hífens).
 *           example: "Miguel de Cervantes"
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de nomes das categorias do livro.
 *           example: ["Ficção Científica", "Literatura Clássica"]
 *         borrowedBy:
 *           type: string
 *           description: ID do usuário que emprestou o livro (opcional).
 *           example: "64f1b2c8e4b0f5a3d8e7f1a3"
 *         isAvailable:
 *           type: boolean
 *           description: Indica se o livro está disponível para empréstimo.
 *           example: true
 */

/**
 * @swagger
 * tags:
 *   name: Livros
 *   description: Gerenciamento de livros
 */

/**
 * @swagger
 * /books:
 *   post:
 *     tags:
 *       - Livros
 *     summary: Cria um novo livro
 *     description: Cria um novo livro com título, autor e categorias.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *           example:
 *             title: "Dom Quixote"
 *             author: "Miguel de Cervantes"
 *             categories: ["Ficção Científica", "Literatura Clássica"]
 *     responses:
 *       201:
 *         description: Livro criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *             example:
 *               title: "Dom Quixote"
 *               author: "Miguel de Cervantes"
 *               categories: ["Ficção Científica", "Literatura Clássica"]
 *               borrowedBy: null
 *               isAvailable: true
 *       400:
 *         description: Erro de validação ou categoria não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "As seguintes categorias não existem: Ficção Científica."
 *       500:
 *         description: Erro interno no servidor.
 */
router.post('/', Auth, bookController.createBook);

/**
 * @swagger
 * /books:
 *   get:
 *     tags:
 *       - Livros
 *     summary: Lista todos os livros
 *     description: Retorna uma lista de todos os livros.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de livros.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *             example:
 *               - title: "Dom Quixote"
 *                 author: "Miguel de Cervantes"
 *                 categories: ["Ficção Científica", "Literatura Clássica"]
 *                 borrowedBy: null
 *                 isAvailable: true
 *               - title: "1984"
 *                 author: "George Orwell"
 *                 categories: ["Distopia", "Ficção Científica"]
 *                 borrowedBy: "64f1b2c8e4b0f5a3d8e7f1a3"
 *                 isAvailable: false
 *       500:
 *         description: Erro interno no servidor.
 */
router.get('/', Auth, bookController.getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     tags:
 *       - Livros
 *     summary: Obtém um livro por ID
 *     description: Retorna os detalhes de um livro específico.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro.
 *     responses:
 *       200:
 *         description: Detalhes do livro.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *             example:
 *               title: "Dom Quixote"
 *               author: "Miguel de Cervantes"
 *               categories: ["Ficção Científica", "Literatura Clássica"]
 *               borrowedBy: null
 *               isAvailable: true
 *       404:
 *         description: Livro não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Livro não encontrado."
 *       500:
 *         description: Erro interno no servidor.
 */
router.get('/:id', Auth, bookController.getBookById);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     tags:
 *       - Livros
 *     summary: Atualiza um livro
 *     description: Atualiza os dados de um livro existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *           example:
 *             title: "Dom Quixote"
 *             author: "Miguel de Cervantes"
 *             categories: ["Ficção Científica", "Literatura Clássica"]
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *             example:
 *               title: "Dom Quixote"
 *               author: "Miguel de Cervantes"
 *               categories: ["Ficção Científica", "Literatura Clássica"]
 *               borrowedBy: null
 *               isAvailable: true
 *       400:
 *         description: Erro de validação ou categoria não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "As seguintes categorias não existem: Ficção Científica."
 *       404:
 *         description: Livro não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Livro não encontrado."
 *       500:
 *         description: Erro interno no servidor.
 */
router.put('/:id', Auth, bookController.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     tags:
 *       - Livros
 *     summary: Exclui um livro
 *     description: Exclui um livro existente.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro.
 *     responses:
 *       204:
 *         description: Livro excluído com sucesso.
 *       404:
 *         description: Livro não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Livro não encontrado."
 *       500:
 *         description: Erro interno no servidor.
 */
router.delete('/:id', Auth, bookController.deleteBook);

/**
 * @swagger
 * /books/{id}/borrow:
 *   post:
 *     tags:
 *       - Livros
 *     summary: Empresta um livro
 *     description: Empresta um livro para um usuário.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID do usuário que está emprestando o livro.
 *                 example: "64f1b2c8e4b0f5a3d8e7f1a3"
 *     responses:
 *       200:
 *         description: Livro emprestado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *             example:
 *               title: "Dom Quixote"
 *               author: "Miguel de Cervantes"
 *               categories: ["Ficção Científica", "Literatura Clássica"]
 *               borrowedBy: "64f1b2c8e4b0f5a3d8e7f1a3"
 *               isAvailable: false
 *       400:
 *         description: Livro já emprestado ou usuário não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Este livro já está emprestado."
 *       404:
 *         description: Livro não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Livro não encontrado."
 *       500:
 *         description: Erro interno no servidor.
 */
router.post('/:id/borrow', Auth, bookController.borrowBook);

/**
 * @swagger
 * /books/{id}/return:
 *   post:
 *     tags:
 *       - Livros
 *     summary: Devolve um livro
 *     description: Devolve um livro emprestado.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro.
 *     responses:
 *       200:
 *         description: Livro devolvido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *             example:
 *               title: "Dom Quixote"
 *               author: "Miguel de Cervantes"
 *               categories: ["Ficção Científica", "Literatura Clássica"]
 *               borrowedBy: null
 *               isAvailable: true
 *       400:
 *         description: Livro não está emprestado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Este livro não está emprestado."
 *       404:
 *         description: Livro não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Livro não encontrado."
 *       500:
 *         description: Erro interno no servidor.
 */
router.post('/:id/return', Auth, bookController.returnBook);

module.exports = router;