var express = require('express');
var userRouter = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/users');
var passport = require('passport');
userRouter.use(bodyParser.json());
var authenticate = require('../authenticate');

userRouter.post('/signup', (req,res,next)=>{
  console.log(req.body);

  User.register(new User({username:req.body.username}), req.body.password, (err,user)=>{
    
    if(err){
     
      console.log(err);
      err.statusCode = 500;
      res.setHeader('Content-Type','application/json');
      res.json({err:err});
    }
    else{
      // console.log("inwside else post");
      if(req.body.firstname){
        user.firstname = req.body.firstname;
      }
      if(req.body.lastname){
        user.lastname = req.body.lastname;
      }
      // console.log("outside user post");
      user.save((err,user)=>{
        // console.log("inside user post");
        if(err){
          res.statusCode = 500;
          res.setHeader('Content-Type','application/json');
          res.json({err:err});
          return;
        }
        passport.authenticate('local')(req,res,() => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            console.log(user.firstname);
            res.json(user.firstname);
        });
      });
    }
  });
});


userRouter.post('/login', (req,res,next)=>{
  
  console.log(req.body.username, " req body name");
  passport.authenticate('local', (err,user,info)=>{
    if(err){
      return next(err);
    }
    if(!user){
      console.log("user not found");
      res.statusCode = 401;
       res.setHeader('Content-Type', 'application/json');
      return res.json({success: false,status: 'Login unsuccessful', err : info});
    }

    req.logIn(user, err=>{
      if(err){
        console.log("error while login");
        res.statusCode = 401;
             res.setHeader('Content-Type', 'application/json');
            return res.json({success: false,status: 'Login unsuccessful', err : 'couldnot login the user'});
      }
      else{

      console.log("successful");
      var token = authenticate.getToken({_id:req.user._id});
      res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
      return res.json({success: true, token: token ,status: 'you are logged in!'});
      }
    })

  })(req,res,next);
});

module.exports = userRouter;