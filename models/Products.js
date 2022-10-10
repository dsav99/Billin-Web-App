const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const productSchema = new Schema({
    name:{
        type:String
    },
    productId:{
        type:String
    },
    size:{
        type:String
    },
    brand:{
        type:String
    },
    price:{
        type:Number,
        get:getPrice,
        set:setPrice
    }
})


function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num;
}

var Products = new mongoose.model("products",productSchema);
module.exports=Products;