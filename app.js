require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn")
var indexRouter = require('./routes/indexRouter');
var orderRouter = require('./routes/ordersRouter')
var userRouter = require('./routes/usersRouter')
var productRouter = require("./routes/productsRouter");
var customerRouter = require("./routes/customersRouter")

const cors =require("cors");


const port = process.env.PORT ||  8005;

// for deployment
if(process.env.NODE_ENV==="production"){
    app.use(express.static(__dirname+"client/build"))
}

app.use(express.json());
app.use(cors());
app.use("/products",productRouter);
app.use("/orders",orderRouter)
app.use("/users",userRouter)
app.use("/customers",customerRouter)

app.use('/', indexRouter);

app.listen(port,()=>{
    console.log("Server started on port "+ port);
    // console.log(process.env);
})


