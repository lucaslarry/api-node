const Book = require('../models/BookModel');
const User = require('../models/UserModel');
const Category = require('../models/CategoryModel'); 
const mongoose = require('mongoose');


const validateCategories = async (categories) => {
  if (!categories || !Array.isArray(categories)) {
    throw new Error('A lista de categorias é inválida.');
  }


  const existingCategories = await Category.find({ name: { $in: categories } });
  if (existingCategories.length !== categories.length) {
    const missingCategories = categories.filter(
      (cat) => !existingCategories.some((ec) => ec.name === cat)
    );
    throw new Error(`As seguintes categorias não existem: ${missingCategories.join(', ')}`);
  }
};


exports.createBook = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { title, author, categories } = req.body;


    await validateCategories(categories);


    const book = new Book({ title, author, categories });
    await book.save({ session });


    await Category.updateMany(
      { name: { $in: categories } },
      { $push: { books: book._id } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(book);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    if (error.code === 11000) {
      res.status(400).json({ error: 'Este livro já existe.' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};


exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar livros.' });
  }
};


exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar livro.' });
  }
};

exports.updateBook = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { title, author, categories } = req.body;

    const book = await Book.findById(req.params.id).session(session);
    if (!book) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    if (categories) {
      await validateCategories(categories);
    }

    await Category.updateMany(
      { name: { $in: book.categories } },
      { $pull: { books: book._id } },
      { session }
    );

    book.title = title || book.title;
    book.author = author || book.author;
    book.categories = categories || book.categories;
    await book.save({ session });

    await Category.updateMany(
      { name: { $in: book.categories } },
      { $push: { books: book._id } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json(book);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const book = await Book.findByIdAndDelete(req.params.id).session(session);
    if (!book) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    await Category.updateMany(
      { name: { $in: book.categories } },
      { $pull: { books: book._id } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(204).send(); 
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: 'Erro ao excluir livro.' });
  }
};


exports.borrowBook = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId } = req.body;

    const book = await Book.findById(req.params.id).session(session);
    if (!book) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    if (book.borrowedBy) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: 'Este livro já está emprestado.' });
    }

    const user = await User.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    book.borrowedBy = userId;
    book.isAvailable = false;
    await book.save({ session });

    user.borrowedBooks.push(book._id);
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json(book);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: 'Erro ao emprestar livro.' });
  }
};

exports.returnBook = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const book = await Book.findById(req.params.id).session(session);
    if (!book) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    if (!book.borrowedBy) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: 'Este livro não está emprestado.' });
    }

    const user = await User.findById(book.borrowedBy).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    user.borrowedBooks = user.borrowedBooks.filter(
      (borrowedBookId) => borrowedBookId.toString() !== book._id.toString()
    );
    await user.save({ session });

    book.borrowedBy = null;
    book.isAvailable = true;
    await book.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json(book);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: 'Erro ao devolver livro.' });
  }
};