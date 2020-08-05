var express = require('express');
var fetchWatchListRouter = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/users');
const authenticate = require('../authenticate');

fetchWatchListRouter.use(bodyParser.json());

fetchWatchListRouter.get('/',authenticate.verifyUser,(req,res,next)=>{
    
    User.findById(req.user._id,(err,user)=>{
       
        if(err){
            console.log(err);
            var err = new Error('err occured while searching for user');
            throw err;
        }
        // res.send('yess, Im totally fucked up right now');
        
        else{
            res.statusCode = 200;
          
            return res.send({data:user.watchlist})
        }
    })
});
module.exports = fetchWatchListRouter;