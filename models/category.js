const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true]
  },
  type: {
    type: String,
    enum: ['faqs', 'products']
  }
});

module.exports = mongoose.model('Category', categorySchema);
