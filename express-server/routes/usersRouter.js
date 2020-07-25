var express = require('express');
var userRouter = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/users');
var passport = require('passport');
userRouter.use(bodyParser.json());
var authenticate = require('../authenticate');

userRouter.post('/signup', (req,res,next)=>{
  User.register(new User({username:req.body.username}), req.body.password, (err,user)=>{
    if(err){
      err.status = 500;
      res.setHeader('Content-Type','application/json');
      res.json({err:err});
    }
    else{
      if(req.body.firstname){
        user.firstname = req.body.firstname;
      }
      if(req.body.lastname){
        user.lastname = req.body.lastname;
      }
      user.save((err,user)=>{
        if(err){
          res.statusCode = 500;
          res.setHeader('Content-Type','application/json');
          res.json({err:err});
          return;
        }
        passport.authenticate('local')(req,res,() => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});


userRouter.post('/login', (req,res,next)=>{
  passport.authenticate('local', (err,user,info)=>{
    if(err){
      return next(err);
    }
    if(!user){
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false,status: 'Login unsuccessful', err : info});
    }

    req.logIn(user, err=>{
      if(err){
        res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false,status: 'Login unsuccessful', err : 'couldnot login the user'});
      }

      var token = authenticate.getToken({_id:req.user._id});
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true, token: token ,status: 'you are logged in!'});
    })

  })(req,res,next);
});

module.exports = dishRouter;