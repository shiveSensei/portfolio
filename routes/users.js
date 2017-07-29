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


//authenticate
router.post('/authenticate',(req, res, next)=>{
  const email = req.body.email;
  const password = req.body.password;
//checks if user exists
  User.getUserByEmail(email, (err, user)=>{
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }
    //if user exists compares password
    User.comparePassword(password, user.password, (err, isMatch)=>{
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 //1 week
        });
        res.json({success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email
          }
      });
    } else {
      return res.json({success: false, msg: 'Wrong Password'});
    }
    });
  });


});

router.get('/profile',passport.authenticate('jwt', {session:false}), (req, res, next)=>{
  res.json({user: req.user});
});




module.exports = router;
