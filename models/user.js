const mongoose = require('mongoose');
const config = require('../config/database');
const co = require('co');
const Schema = require('mongoose').Schema;
const bcrypt = require('bcryptjs');

//user Schema

const UserSchema = mongoose.Schema({
  name:{
    type: String
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUsers = function(callback){
  User.find(callback);
}

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getByEmail = function(email, callback){
  const query = {email : email}
  User.findOne(query, callback);
}

//hash password generating salt
module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(newUser.password, salt, (err, hash) =>{
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}
