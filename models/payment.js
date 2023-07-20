const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  cardNumber: {
    type: Number,
    required: [true],
    trim: true
  },
  cardHolder: {
    type: String,
    required: [true],
    trim: true
  },
  expirationDate: {
    type: String,
    required: [true],
    trim: true
  },
  cvv: {
    type: Number,
    required: [true],
    trim: true
  },
});

module.exports = mongoose.model('Payment', paymentSchema);