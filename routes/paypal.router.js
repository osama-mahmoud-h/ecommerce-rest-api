const express = require('express');

const router = express.Router();

//paypal
const paypal = require('paypal-rest-sdk');
const {paypal_config} = require('../config/paypal.config');
paypal_config(paypal);

//controller
const {
pay_with_paypal,
paypal_success,

} = require('../controllers/payment/paypal.controller');

//middleware
const verfiyUserAuth = require('../middleware/verfiyUserAuth');

//config
 
router.route('/pay').post((req,res,next)=>{
    //-- midlleware -- 
    verfiyUserAuth(req,res,next);
},(req,res,next)=>{
    pay_with_paypal(req,res,next,paypal);
});

router.route('/success').get((req,res,next)=>{
    //-- midlleware -- 
    verfiyUserAuth(req,res,next);
},(req,res,next)=>{
    paypal_success(req,res,next,paypal);
});

router.route('/success').get((req,res,next)=>{
    //-- midlleware -- 
    verfiyUserAuth(req,res,next);
},(req,res,next)=>{
   return res.status(200).json({
       success:true,
       message:"Payment canceld successfully!"
   })
})


module.exports = router;