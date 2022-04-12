const express = require('express');

const router = express.Router();

const{
    makeOrder 
} = require('../controllers/order/order.controller');

//middleware
const verfiyUserAuth = require('../middleware/verfiyUserAuth');

router.route('/create').post((req,res,next)=>{verfiyUserAuth(req,res,next)}, makeOrder);

module.exports = router;