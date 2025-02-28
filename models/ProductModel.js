let mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true, 
  },
  preco: {
    type: Number,
    required: true, 
    min: 0, 
  },
  descricao: {
    type: String,
    required: false,
  },
});



function getProducts() {
    return products
}

module.exports = mongoose.model('Product', productSchema);