const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

class AuthController {
  static async register({ name, email, password }) {
    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        throw new Error('Este e-mail já está em uso.');
      }

      const user = new UserModel({ name, email, password });
      await user.save();
      return user;
    } catch (error) {
      throw new Error('Erro ao registrar usuário: ' + error.message);
    }
  }

  static async login({ email, password }) {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new Error('E-mail ou senha incorretos.');
      }

      const isCorrectPassword = await new Promise((resolve, reject) => {
        user.isCorrectPassword(password, (err, same) => {
          if (err) reject(err);
          resolve(same);
        });
      });

      if (!isCorrectPassword) {
        throw new Error('E-mail ou senha incorretos.');
      }

      const token = jwt.sign({ email }, secret, { expiresIn: '1d' });
      return { user, token };
    } catch (error) {
      throw new Error('Erro interno, tente novamente: ' + error.message);
    }
  }
}

module.exports = AuthController;