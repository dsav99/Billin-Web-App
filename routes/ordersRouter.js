const express = require("express");
const bodyParser = require("body-parser");
const Orders = require("../models/Orders");
const Customers = require("../models/Customers");
var orderRouter = express.Router();
const passport = require("passport");
const Products = require("../models/Products");
orderRouter.use(bodyParser.json());


orderRouter.route("/")
    .get(passport.authenticate('jwt',{session:false}),(req, res, next) => {
        Orders.find()
            .populate("customer")
            .populate('cart')
            .then(orders => {
                console.log(orders);
                res.statusCode = 200;
                // res.setHeader("Content-Type","'text/plain");
                // res.setHeader("Access-Control-Allow-Origin","https://localhost:3001")
                res.json(orders);
            }, err => next(err))
            .catch(err => next(err))
    })
    .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
        Orders.create({
            customer: req.body.customer,
            total: req.body.total,
            cart: req.body.cart
        })
        .then((data)=>res.json(data));
    })

orderRouter.route("/gettotal")
    .get((req, res, next) => {
        Orders.aggregate(
            [
                {
                    $group: {
                        _id: '',
                        "Total": { $sum: '$total' },
                        "Count": { $sum: 1 }
                    }
                }, {
                    $project: {
                        _id: 0,
                        "TotalAmount": "$Total",
                        "totalOrders": "$Count"
                    }
                }
            ]
        )
            .then(data => res.send(data[0]))
    })



module.exports = orderRouter