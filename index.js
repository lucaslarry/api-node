const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const productRouter = require('./routes/ProductRouter.js');
const db = require('./db/database.js');


db.connect();
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API Node',
      version: '1.0.0',
      description: 'Documentação da minha API Node',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], 
};



const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/products', productRouter);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});