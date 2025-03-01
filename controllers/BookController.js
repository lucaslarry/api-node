const Book = require('../models/BookModel');
const User = require('../models/UserModel');
const mongoose = require('mongoose');


exports.createBook = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { title, author, categories } = req.body;

    for (const categoryId of categories) {
      const categoryExists = await mongoose.model('Category').exists({ _id: categoryId }).session(session);
      if (!categoryExists) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ error: `Categoria com ID ${categoryId} não encontrada.` });
      }
    }


    const book = new Book({ title, author, categories });
    await book.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(book);
  } catch (error) {

    await session.abortTransaction();
    session.endSession();

    if (error.code === 11000) {
      res.status(400).json({ error: 'Este livro já existe.' });
    } else {
      res.status(500).json({ error: 'Erro ao criar livro.' });
    }
  }
};


exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('categories', 'name').populate('borrowedBy', 'name email');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar livros.' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('categories', 'name').populate('borrowedBy', 'name email');
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
      for (const categoryId of categories) {
        const categoryExists = await mongoose.model('Category').exists({ _id: categoryId }).session(session);
        if (!categoryExists) {
          await session.abortTransaction();
          session.endSession();
          return res.status(400).json({ error: `Categoria com ID ${categoryId} não encontrada.` });
        }
      }
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.categories = categories || book.categories;
    await book.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json(book);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: 'Erro ao atualizar livro.' });
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