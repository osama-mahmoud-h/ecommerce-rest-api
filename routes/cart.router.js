//const { Cart } = require("../model/Cart");
const express = require('express');
const router = express.Router();

//middleware 
const verfiyUserAuth = require('../middleware/verfiyUserAuth');

//controllers
const {
    addItemToCart
} = require('../controllers/cart/cart.controller');

router.route("/add-item-to-cart").post((req,res,next)=>{verfiyUserAuth(req,res,next);}, addItemToCart);


module.exports = router;
