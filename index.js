const express = require('express');
const bodyParser = require("body-parser");
const loginRouter = require('./routes/authRoute.js'); 
const personRoutes = require('./routes/personRoutes.js');
const profileRoutes = require('./routes/profileRoutes.js');
const projectRoutes = require('./routes/projectRoutes.js');
const tasksRoutes = require('./routes/tasksRoutes.js');
const db = require("./db/db.js");
const setupSwagger = require('./swagger');

const app = express();

app.use(bodyParser.json());


setupSwagger(app);


app.use("/api", loginRouter); 
app.use('/api', tasksRoutes);
app.use('/api', personRoutes);
app.use('/api', profileRoutes);
app.use('/api', projectRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});