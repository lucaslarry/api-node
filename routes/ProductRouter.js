const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const ENDPOINT = '/products';



/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - nome
 *         - preco
 *       properties:
 *         _id:
 *           type: string
 *           description: ID gerado automaticamente pelo MongoDB.
 *           example: "64f1b2c8e4b0f5a3d8e7f1a2"
 *         nome:
 *           type: string
 *           description: Nome do produto (4-60 caracteres, apenas letras e espaços).
 *           minLength: 4
 *           maxLength: 60
 *           pattern: "^[A-Za-z\\s]+$"
 *           example: "Notebook Gamer"
 *         preco:
 *           type: number
 *           description: Preço do produto (deve ser um número entre 0 e 100000).
 *           minimum: 0
 *           maximum: 100000
 *           example: 4500.99
 *         descricao:
 *           type: string
 *           description: Descrição do produto (opcional, máximo 100 caracteres).
 *           maxLength: 100
 *           example: "Notebook com placa de vídeo dedicada e 16GB de RAM."
 *         __v:
 *           type: number
 *           description: Versão do documento (gerada automaticamente pelo Mongoose).
 *           example: 0
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     description: Cria um novo produto com nome, preço e descrição.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Erro de validação nos dados do produto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   description: Detalhes dos erros de validação.
 *                   example: { "nome": "Nome deve ter entre 4 e 60 caracteres." }
 *       500:
 *         description: Erro interno no servidor.
 */
router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);


module.exports = router;