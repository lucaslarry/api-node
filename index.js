const { ApolloServer } = require('apollo-server');
const { readFileSync } = require('fs');
const { join } = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = readFileSync(join(__dirname, 'graphql', 'schema.graphql'), 'utf-8');

const resolvers = require('./graphql/resolvers');
const context = require('./graphql/context');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Conectado ao MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com o MongoDB:', err);
});


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true, 
  playground: true,   
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Servidor GraphQL rodando em ${url}`);
});