const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
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
  },
  Market: {
    type: Schema.Types.ObjectId,
    ref: 'Market'
  }
}, 
{
  timestamps: false
});


schema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Seller', schema);
