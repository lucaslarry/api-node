const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGODB_URI;

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect(mongoURI, {
        })
        .then(() => console.log('Conectado ao MongoDB!'))
        .catch(err => console.error('Erro ao conectar ao MongoDB:', err));
    }
}

module.exports = new Database();
