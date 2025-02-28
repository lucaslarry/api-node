let mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    minlength: 4, 
    maxlength: 60, 
    match: /^[A-Za-z\s]+$/, 
  },
  preco: {
    type: Number,
    required: true,
    min: 0, 
    max: 100000, 
  },
  descricao: {
    type: String,
    required: false,
    maxlength: 100, 
  },
});



module.exports = mongoose.model('Product', productSchema);