const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Phone: {
    type: String,
    required: true
  },
  Adress: {
    type: String,
    required: true
  }
}, 
{
  timestamps: true
});

schema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Market', schema);
