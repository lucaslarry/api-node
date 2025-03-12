const UserModel = require('../models/UserModel');

class UserController {
  static async createUser({ name, email, password }) {
    const user = new UserModel({ name, email, password });
    await user.save();
    return user;
  }

  static async getUserByEmail(email) {
    return await UserModel.findOne({ email });
  }
}

module.exports = UserController;