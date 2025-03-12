const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) throw new Error('Não autenticado');
      return await UserController.getUserByEmail(context.user.email);
    },
  },
  Mutation: {
    register: async (parent, { name, email, password }) => {
      return await AuthController.register({ name, email, password });
    },
    login: async (parent, { email, password }) => {
      return await AuthController.login({ email, password });
    },
  },
};

module.exports = resolvers;