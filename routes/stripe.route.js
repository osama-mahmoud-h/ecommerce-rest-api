const express = require('express');
const router = express.Router();

const{
stripeCheckout
} = require('../controllers/payment/stripe.controller');
//middleware
const verfiyUserAuth = require('../middleware/verfiyUserAuth');

router.route('/checkout').post((req,res,next)=>{
    stripeCheckout(req,res,next);
})


module.exports = router;