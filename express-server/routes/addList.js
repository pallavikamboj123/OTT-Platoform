var express = require('express');
var addListRouter = express.Router();
const bodyParser = require('body-parser');
addListRouter.use(bodyParser.json());

addListRouter.post('/', (req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('content-type','application/json')
    res.json({status:'ok'});
});

module.exports = addListRouter;