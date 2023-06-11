const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tagsSchema = new Schema({
  name: {
    type: String,
    required: [true]
  },
  description: {
    type: String,
    required: [true]
  },
});

module.exports = mongoose.model('Tags', tagsSchema);
