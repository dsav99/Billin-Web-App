const mongoose = require("mongoose");
const Schema =  mongoose.Schema;


const customerSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"orders"
        }
    ]
})

var Customers = mongoose.model("customers",customerSchema);
module.exports = Customers;