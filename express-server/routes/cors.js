const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:3000', 'http://localhost:3000/watchlist'];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    console.log(req.header('Origin')," inside cors");
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        console.log("inside cors true");
        corsOptions = { origin: true };
    }
    else {
        console.log("inside cors false");
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
