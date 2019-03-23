const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  Price: {
    type: String,
 
  },
  Count: {
    type: String,
   
  },
  Merchandise: {
    type: Schema.Types.ObjectId,
    ref: 'Merchandise'
  },

  Client: {
    type: Schema.Types.ObjectId,
    ref: 'Client'
  },
  Market: {
    type: Schema.Types.ObjectId,
    ref: 'Market'
  },
  Seller: {
    type: Schema.Types.ObjectId,
    ref: 'Seller'
  }
}, 
{
  timestamps: false
});

schema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Order', schema);
