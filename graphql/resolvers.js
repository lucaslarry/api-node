const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) throw new Error('Não autenticado');
      return await UserController.getUserByEmail(context.user.email);
    },
    users: async () => {
      return await UserController.getUsers();
    },
    user: async (parent, { id }) => {
      return await UserController.getUserById(id);
    },
  },
  Mutation: {
    register: async (parent, { name, email, password }) => {
      return await AuthController.register({ name, email, password });
    },
    login: async (parent, { email, password }) => {
      return await AuthController.login({ email, password });
    },
    updateUser: async (parent, { id, name, email, password }) => {
      return await UserController.updateUser(id, { name, email, password });
    },
    deleteUser: async (parent, { id }) => {
      return await UserController.deleteUser(id);
    },
  },
};

module.exports = resolvers;