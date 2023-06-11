const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const faqsSchema = new Schema({
  question: {
    type: String,
    required: [true]
  },
  answer: {
    type: String,
    required: [true]
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
});

module.exports = mongoose.model('Faqs', faqsSchema);
