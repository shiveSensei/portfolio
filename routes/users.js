const router = require('express').Router();
const mongoose = require('mongoose');
const config = require('../config/database');
const Schema = require('mongoose').Schema;
const co = require('co');

const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.get('',(req, res, next)=>{

User.getUsers(function(err, users){

  if(err){
    throw err;
  }else{
    res.json(users);}
  });
});


//Regiseter user
router.post('/register', (req, res, next)=> {
  let newUser = new User({
    name : req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password
  });

  User.addUser(newUser,(err, user)=>{
    if(err){
    throw err;
      res.json({success: false, msg: 'failed to register'});
    }else{
      res.json({success: true, msg: 'succes to register'});
    }

  });
});



router.post('/authenticate',(req, res, next)=>{

  res.send('Authenticate');

});




module.exports = router;
