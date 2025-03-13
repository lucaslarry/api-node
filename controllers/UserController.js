const UserModel = require('../models/UserModel');

class UserController {
  static async createUser({ name, email, password }) {
    const user = new UserModel({ name, email, password });
    await user.save();
    return user;
  }

  static async getUsers() {
    return await UserModel.find();
  }

  static async getUserById(id) {
    return await UserModel.findById(id);
  }

  static async updateUser(id, { name, email, password }) {
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = password;
    
    return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async deleteUser(id) {
    return await UserModel.findByIdAndDelete(id);
  }
}

module.exports = UserController;