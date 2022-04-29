const express = require('express');
const router = express.Router();

//controller
const {
    createProduct,
    updateProduct,
    deleteProduct,
    allProducts
} = require('../controllers/product/product.controller');

//middleware
const verfiyAdminAuth = require('../middleware/verfiyAdminAuth');

router.route('/create').post((req,res,next)=>{verfiyAdminAuth(req,res,next)} ,createProduct);

router.route('/update/:id').put((req,res,next)=>{verfiyAdminAuth(req,res,next)} ,updateProduct);

router.route('/delete/:id').delete((req,res,next)=>{verfiyAdminAuth(req,res,next)} ,deleteProduct);

router.route('/all').get((req,res,next)=>{verfiyAdminAuth(req,res,next)} ,allProducts);

module.exports = router;