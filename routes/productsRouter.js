const express = require("express");
const bodyParser = require("body-parser");
const Products = require("../models/Products");
const passport = require("passport");

var productRouter = express.Router();

productRouter.use(bodyParser.json());

productRouter.route("/")
.get(passport.authenticate('jwt',{session:false}),async (req,res,next)=>{
try{
    const data = await Products.find(req.query);
    res.json(data)
}
catch(err){
    next(err)
}
    
})
.post(passport.authenticate('jwt',{session:false}),async (req,res,next)=>{

    try{
        const product = await Products.create(req.body);
        res.status(200).json(product);
    }
    catch(err){
        next(err);
    }
})
.put((req,res)=>{
    res.statusCode=403;
    res.end("Put not supported")
})
.delete(passport.authenticate('jwt',{session:false}), async (req,res,next)=>{

    try{
        const deletedProducts = await Products.remove();
        res.status(200).json(deletedProducts);
    }catch(err){
        next(err);
    }    
})




productRouter.route("/:productId")
.get(async (req,res,next)=>{
    try{
        console.log(req.params.productId);
        const product = await Products.find({productId:req.params.productId});
        res.status(200).json(product);
        // console.log(product);

    }catch(err){
        next(err);
    }
    // console.log(req.params.productId);
    // Products.find({productId:req.params.productId})
    // .then((response)=>{
    //     res.statusCode=200;
    // res.setHeader("Content-Type","application/json")
    // res.json(response)
    // },err=>next(err));
    
})
.post((req,res)=>{
    res.statusCode=200;
    res.end("Post not supported")
})
.put((req,res)=>{
    res.statusCode=200;
    res.end("Will update the product,not implemented")
})
.delete((req,res)=>{
    res.statusCode=200;
    res.end("Will delete one product,not implemented")
})



module.exports = productRouter;