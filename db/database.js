const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/node-api';

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
