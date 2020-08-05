var express = require('express');
var addListRouter = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/users');
const { watch } = require('../models/users');
addListRouter.use(bodyParser.json());

addListRouter.post('/', (req,res,next)=>{
    var userReq = req.body.user;
    var anime = req.body.anime;

    console.log(userReq," user");
    console.log(animeId," anime id");
    User.findOne({username: userReq.username}, (err,user)=>{
        if(err){
            res.statusCode = 500;
            var err = new Error('couldnot find user');
            throw err;
        }
        else if(user){
            animeId = parseInt(animeId);
            console.log(typeof(animeId));
            console.log(typeof(user.watchlist[0]));
            for(var i = 0;i<user.watchlist.length;i++){
                if(anime.id === user.watchlist[i]){
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    return res.send({status:'alreadt present', data:user.watchlist});
                }
            }
            user.watchlist.push(animeId);
            user.save();
           res.statusCode = 200;
           console.log(user.watchlist," users watchlist");
           res.setHeader('Content-type','application/json');
           return res.send({data: user.watchlist, status:'successful'});
        }
    })
});

module.exports = addListRouter;