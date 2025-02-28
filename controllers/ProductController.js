const { get } = require('mongoose');
const product = require('../models/ProductModel');

const getAllProducts = async (req, res) => {
    const products = await product.find();
    res.json(products.getProducts())
}

const createProduct = async (req, res) => {
    try {
      const product = new Product(req.body);
  
      await product.save();
  
      res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o produto' });
     
}};

module.exports = {getAllProducts, createProduct};