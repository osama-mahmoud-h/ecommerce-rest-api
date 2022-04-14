const express = require('express');
require('dotenv').config({path:"./config.env"});
const app =express();
const cros = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//require('body-parser-zlib')(bodyParser);
const multer  = require('multer');
const upload  = multer();
//connect db
const connectDB = require("./config/database");
connectDB();
//setup our view engine 
app.set("view engine","ejs");
// allow us to get data from the bosy
app.use(express.json());
//app.use(static)
app.use(express.urlencoded({extended:true}));
//for parsing multipart/form-data
//app.use(upload.array());
//app.use(bodyParser.zlib());
app.use(cros());
//use cookie parser
app.use(cookieParser());
//set static file
app.use(express.static('./public'));
// importing user context
const User = require("./model/User");

//======================= START MIDDLEWARES ==============================

 const verfiyUserAuth = require('./middleware/verfiyUserAuth');

 const verfiyAdminAuth = require('./middleware/verfiyAdminAuth');

//======================= END MIDDLEWARES ================================


//======================= START ROUTES ===================================

//routes for categories
app.use('/api/amdin/categories',require('./routes/category.route'));

//routes for products
app.use('/api/admin/prodcts',require('./routes/product.router'));

//routes for cart
app.use('/api/user/cart',require('./routes/cart.router'));

//routes for userAuth
app.use('/api/user/auth',require('./routes/userAuth.route'));

//routes for superAdmin
//app.use('/api/superAdmin',require('./routes/superAdminAuth'));

//routes for orders
app.use('/api/user/order',require('./routes/order.route'));

//routes for admins
app.use('/api/admin/auth',require('./routes/admin.route'));

//routes for categories
app.use('/api/user/cart',require('./routes/cart.router'));

//routes for current user
app.get('/api/current-auth-user',(req,res,next)=>{
     verfiyUserAuth(req,res,next);
},(req,res,next)=>{
   console.log(req.user)
});

//routes for current admin
app.get('/api/current-auth-admin',(req,res,next)=>{
  verfiyAdminAuth(req,res,next);
},async (req,res,next)=>{
console.log(req.user)
});

//=======================  END ROUTES ====================================
//app.use("/api/auth",require("./routes/userAuth.route"));

const authVerfiy = require("./middleware/verfiyUserAuth");

app.get("/api/dashboard",authVerfiy,(req,res,next)=>{
    res.status(200).json({
      isLoggedIn:true,
      username:req.user.username,
      role:req.user.role
    });
});
app.use('/api',require('./routes/test.route'));

app.get('/lll',(req,res,next)=>{
  res.redirect('http://127.0.0.1::3000')
})

app.get("/api/isUserAuth", (req,res,next)=>{
         authVerfiy(req,res,next,["create","update"]);
}, (req, res) => {
  console.log("verfied, congrats! ",req.user.role);
  return res.json({isLoggedIn: true, username: req.user.username})

});

app.use('/api/admin/product',require('./routes/product.router'));

app.post("/api/payment",(req,res,next)=>{
  checkout(req,res,next);
});
app.use("/api/user",require('./routes/order.route'));

/** payments routs */
//paypal
app.use('/api/paypal',require('./routes/paypal.router'));

//stripe
app.use('/api/stripe',require('./routes/stripe.route'));
//==================================
const paypal = require('paypal-rest-sdk');



//==========================


const PORT = 5000;
app.listen(PORT,()=>{
  console.log("app run on port: ",PORT);
})
