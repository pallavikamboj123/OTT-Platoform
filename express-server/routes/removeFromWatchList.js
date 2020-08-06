var express = require('express');
var removeWatchListRouter = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/users');
const authenticate = require('../authenticate');

removeWatchListRouter.use(bodyParser.json());


removeWatchListRouter.get('/',(req,res,next)=>{
    res.send('successful');
})