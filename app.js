const express = require('express');
const app =express();
const cros = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

/// dotenv config 
dotenv.config({path:'./.env'});

// connect to database 
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

 const verfiySpuerAdminAuth = require('./middleware/verfiySuperAdminAuth');

//======================= END MIDDLEWARES ================================


//======================= START ROUTES ===================================

//routes for categories
app.use('/api/amdin/categories',require('./routes/category.route'));  //done

//routes for products
app.use('/api/admin/products',require('./routes/product.router'));  //done

//routes for cart
app.use('/api/user/cart',require('./routes/cart.router')); // done

//routes for userAuth
app.use('/api/user/auth',require('./routes/userAuth.route')); // done

//routes for superAdmin
app.use('/api/superAdmin/auth',require('./routes/superAdminAuth'));//done

//routes for orders
app.use('/api/user/order',require('./routes/order.route')); //done

//routes for admins
app.use('/api/admin/auth',require('./routes/admin.route')); //done

//routes for categories
app.use('/api/user/cart',require('./routes/cart.router')); //done

// is User authed  ? 
app.get('/api/user/isAuth',(req,res,next)=>{
  verfiyUserAuth(req,res,next);
},(req,res,next)=>{
  return res.status(200).json({
    success:true,
    data:{
      "username":req.user.username,
      "id":req.user._id,
    }
  });
});

// is Admin authed  ?  //done
app.get('/api/admin/isAuth',(req,res,next)=>{
  verfiyAdminAuth(req,res,next);
},(req,res,next)=>{
  return res.status(200).json({
    success:true,
    data:{
      "username":req.user.username,
      "id":req.user._id,
    }
  });
});

// is superAdmin authed  ?  //done
app.get('/api/superAdmin/isAuth',(req,res,next)=>{
  verfiyAdminAuth(req,res,next);
},(req,res,next)=>{
  return res.status(200).json({
    success:true,
    data:{
      "username":req.user.username,
      "id":req.user._id,
    }
  });
});
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
//app.use('/api/paypal',require('./routes/paypal.router'));

//stripe
app.use('/api/stripe',require('./routes/stripe.route'));
//==================================
//const paypal = require('paypal-rest-sdk');



//==========================

const PORT = process.env.PORT||5000;
app.listen(PORT,()=>{
  console.log("app run on port: ",PORT);
})
