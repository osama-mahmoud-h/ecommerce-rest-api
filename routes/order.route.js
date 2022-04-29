const express = require('express');

const router = express.Router();

const{
    makeOrder ,
    getPaidOrder,
    getWhenArriveOrder
} = require('../controllers/order/order.controller');

//middleware
const verfiyUserAuth = require('../middleware/verfiyUserAuth');
const verfiyAdminAuth = require('../middleware/verfiyAdminAuth');


router.route('/create').post((req,res,next)=>{verfiyUserAuth(req,res,next)}, makeOrder);

router.route('/all-when-arrive').get((req,res,next)=>{verfiyAdminAuth(req,res,next)}, getWhenArriveOrder);

router.route('/all-paid').get((req,res,next)=>{verfiyAdminAuth(req,res,next)}, getPaidOrder);

module.exports = router;