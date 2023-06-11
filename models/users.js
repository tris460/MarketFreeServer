const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true]
  },
  lastname: {
    type: String,
    required: [true]
  },
  email: {
    type: String,
    required: [true]
  },
  password: {
    type: String,
    required: [true]
  },
  image: {
    type: String,
    default: '' //TODO: Add a default image (base64)
  },
  purchasedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  shoppingCart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  productsForSale: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

module.exports = mongoose.model('User', userSchema);
