const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors'); 
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const userRouter = require('./routes/UserRouter');
const db = require('./db/database.js');
const profileRouter = require('./routes/ProfileRouter');
const bookRouter = require('./routes/BookRouter');
const categoryRouter = require('./routes/CategoryRouter');

db.connect();
const app = express();
const port = process.env.PORT || 3000;


app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.use(bodyParser.json());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API Node',
      version: '1.0.0',
      description: 'Documentação da minha API Node',
    },tags: [
      {
        name: 'Usuários',
        description: 'Operações relacionadas a usuários',
      },
    ],
    servers: [
      {
        url: process.env.CORS_ORIGI,
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/users', userRouter);
app.use('/profiles', profileRouter);
app.use('/books', bookRouter);
app.use('/categories', categoryRouter);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});