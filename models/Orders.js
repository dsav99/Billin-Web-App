const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"customers"
    },
    total:{
        type:Number
    },
    cart:[
        {
                type:mongoose.Schema.Types.ObjectId,
                ref:"products"
        }
    ]
},{
    timestamps:true
});

var Orders = mongoose.model("orders",orderSchema);
module.exports = Orders;


