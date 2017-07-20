const mongoose = require('mongoose');
const config = require('../config/database');
const Schema = require('mongoose').Schema;
const co = require('co');
//Service Schema


const CategorySchema = mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  description:{
    type: String

  }


});

const Category = module.exports = mongoose.model('Category', CategorySchema);


module.exports.addCategory = function(newCategory, callback){

  newCategory.save(callback);
}

module.exports.getCategories = function(callback){
  Category.find(callback);

}
