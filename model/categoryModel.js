const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  
    category: { type: String },

},
    { timestamps: true },
);
var categoryModel = mongoose.model('category', categorySchema);
module.exports = categoryModel;