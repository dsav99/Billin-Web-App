const express = require("express");
const bodyParser = require("body-parser");
const Customers = require("../models/Customers");
const passport = require("passport");
var customerRouter = express.Router();

customerRouter.use(bodyParser.json());

customerRouter.route("/")
.get(passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    // console.log(req.query);
    Customers.find(req.query)
    .then((customers)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        // res.setHeader("Access-Control-Allow-Origin","https://localhost:3001")
        res.json(customers);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(passport.authenticate('jwt',{session:false}),(req,res,next)=>{

    // console.log("--------");
    // console.log(req.body);
    // console.log("--------");
    Customers.create(req.body)
    .then((customer)=>{

        // console.log("Customer created: ",customer);
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        // res.setHeader("Access-Control-Allow-Origin","https://localhost:3001")
        res.json(customer);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.put((req,res)=>{
    res.statusCode=403;
    res.end("Put not supported")
})

// customerRouter.route("/getTotalCustomers")
// .get((req,res,next)=>{
//     Customers.count()
//     .then((res)=>console.log(res))
// })

customerRouter.route("/:customerId")
.get((req,res)=>{

    if(req.params.customerId==="number"){
        Customers.count()
        .then(num=>res.json(num))
        // res.send(Customers.count());
    }
    
})
.post(passport.authenticate('jwt',{session:false}),(req,res)=>{
    Customers.updateOne({_id:req.params.customerId},{$set:{orders:req.body.orders}})
    .then((response)=>{
        res.statusCode=200;
        res.json(response)
    })
})
.put((req,res)=>{
    res.statusCode=200;
    res.end("Will update the customer")
})


customerRouter.route("/addOrder")
.post((req,res)=>{
    Customers.updateOne({_id:req.body.customerId},{$set:{orders:req.body.orders}})
    .then((response)=>{
        res.statusCode=200;
        res.json(response)
    })

})



module.exports = customerRouter;