const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  Category: {
    type: String,
    required: true
  },
  Title: {
    type: String,
    required: true
  },
  Producer: {
    type: String,
    required: true
  },
  Price: {
    type: String,
    required: true
  },
  Interface: {
    type: String,
  },
  Power: {
    type: String,
  },
  Type: {
    type: String,
  }
}, 
{
  timestamps: true
});

schema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Merchandise', schema);
