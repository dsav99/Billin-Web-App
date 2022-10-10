const mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")

var userSchema = new Schema({
   
    username:{
        type:String,
        required:true,
        unique:true
    },
    admin:{
        type:Boolean,
        default:false
    }
})

userSchema.plugin(passportLocalMongoose);

var Users= mongoose.model("users",userSchema);

module.exports = Users;