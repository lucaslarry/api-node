const UserModel = require('../models/UserModel');

class UserController {
  static async createUser({ name, email, password }) {
    if (!name || !email || !password) {
      throw new Error('400: Nome, email e senha são obrigatórios');
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error('409: Email já cadastrado');
    }

    const user = new UserModel({ name, email, password });
    await user.save();
    return user;
  }

  static async getUsers() {
    const users = await UserModel.find();
    if (users.length === 0) {
      throw new Error('404: Nenhum usuário encontrado');
    }
    return users;
  }

  static async getUserById(id) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error('400: ID inválido');
    }

    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error('404: Usuário não encontrado');
    }
    return user;
  }

  static async updateUser(id, { name, email, password }) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error('400: ID inválido');
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      throw new Error('404: Usuário não encontrado');
    }

    return updatedUser;
  }

  static async deleteUser(id) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error('400: ID inválido');
    }

    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error('404: Usuário não encontrado');
    }

    return { message: 'Usuário deletado com sucesso' };
  }
}

module.exports = UserController;
