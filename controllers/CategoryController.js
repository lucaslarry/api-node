const Category = require('../models/CategoryModel');
const Book = require('../models/BookModel');
const mongoose = require('mongoose');

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: 'Esta categoria já existe.' });
    }


    const category = new Category({ name });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Esta categoria já existe.' });
    } else {
      res.status(500).json({ error: 'Erro ao criar categoria.' });
    }
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('books', 'title author');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar categorias.' });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('books', 'title author');
    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada.' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar categoria.' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada.' });
    }

    if (name) {
      const existingCategory = await Category.findOne({ name });
      if (existingCategory && existingCategory._id.toString() !== req.params.id) {
        return res.status(400).json({ error: 'Esta categoria já existe.' });
      }
    }

    category.name = name || category.name;
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Esta categoria já existe.' });
    } else {
      res.status(500).json({ error: 'Erro ao atualizar categoria.' });
    }
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada.' });
    }

    await Book.updateMany(
      { categories: req.params.id },
      { $pull: { categories: req.params.id } }
    );

    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir categoria.' });
  }
};