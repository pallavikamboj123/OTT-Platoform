var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    firstname:{
        type: String,
        default: ''
    },
    lastname:{ 
        type:String,
        default: ''
    },
    watchlist:[{
        type:Object
    }]
},{
    timestamps: true
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);