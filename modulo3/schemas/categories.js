const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema({
    name: String
  });

module.exports =  mongoose.model('Categories', CategoriesSchema);
