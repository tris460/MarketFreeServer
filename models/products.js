const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true]
  },
  price: {
    type: Number,
    required: [true]
  },
  description: {
    type: String,
    required: [true]
  },
  discount: {
    type: Number,
    required: [false]
  },
  image: {
    type: String,
    default: '' //TODO: Add a default image (base64)
  },
  quantity: {
    type: Number,
    required: [true]
  },
  publishedDay: {
    type: String,
    required: [true]
  },
  status: {
    type: Boolean,
    required: [true]
  },
  review: [{
    type: String
  }],
  promotion: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Promotion'
  }],
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tags'
  }],
  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

module.exports = mongoose.model('Product', productSchema);
