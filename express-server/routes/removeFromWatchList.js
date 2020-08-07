var express = require('express');
var removeWatchListRouter = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/users');
const authenticate = require('../authenticate');
var cors = require('./cors');
removeWatchListRouter.use(bodyParser.json());


removeWatchListRouter.route('/')
.get(cors.cors,(req,res,next)=>{
    console.log(req.header);
    return res.send({status:'ok'})
})
// .options(cors.cors, (req,res)=>{
//     console.log("inside options");
//     res.sendStatus(200);
// })
.delete(authenticate.verifyUser, (req,res,next)=>{
    // console.log(req.body);
   
    res.setHeader("Access-Control-Allow-Origin", "*");

    console.log(res);
    return res.send({status: 'okay'});
})
module.exports = removeWatchListRouter;