var express = require('express');
var router = express.Router();

const bodyParser = require("body-parser");
var User = require("../models/Users");

var passport = require("passport");
var authenticate = require("../passport")
// const cors = require("./cors");
const jwt = require('jsonwebtoken');
router.use(bodyParser.json());





/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// router.options('*',cors.corsWithOptions,(req,res)=>{res.sendStatus(200)})


router.post('/signup', function(req, res) {       

  var newUser =new User({username : req.body.username});   

        User.register(newUser, req.body.password, function(err, user) { 

          if (err) { 

            res.json({success:false, message:"Your account could not be saved. Error: ", err}) 

          }else{ 

            res.json({success: true, message: "Your account has been saved"}) 

          } 

        }); 

})

router.post("/protected",passport.authenticate('jwt',{session:false}),(req,res,next)=>{
  // res.setHeader("Access-Control-Allow-Origin","https://localhost:3001")

  res.json({success:"true"})
})

router.post('/login',(req,res,next)=>{
  passport.authenticate('local',(err,user,info)=>{
    if(err){
      res.json({success: false, message: err,step:"1"});
    }
    else{
      if(!user){
        res.json({success: false, message: 'username or password incorrect',step:"2"})
      }
      else{
        req.logIn(user,(errw)=>{
          if(err){
            res.json({success: false, message: errw,step:"3"})
          }
          else{
            console.log("HERE");
            const token =  jwt.sign({userId : user._id, 
              username:user.username}, process.env.KEY, 
                 {expiresIn: '24h'})
           res.json({success:true, message:"Authentication successful", token: token,username:user.username });
          }
        })
      }
    }
      

  })(req,res)
});

module.exports = router;
