const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
  name: String,
  items: [{
    name: String,
    notes: String,
    category: String,
    outfitPiece: String,
    tags: [String],
  }],
});

const itemBankSchema = mongoose.Schema({
  name: {
    type: String,
    match: /^Item Bank$/,
  },
  items: [{
    name: String,
    notes: String,
    category: String,
    outfitPiece: String,
    tags: [String],
    lists: [String],
  }],
});

module.exports.List = mongoose.model('List', listSchema);
module.exports.ItemBank = mongoose.model('ItemBank', itemBankSchema);
