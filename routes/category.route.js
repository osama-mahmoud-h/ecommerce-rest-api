const express = require("express");
const router = express.Router();
const {
    createCategory,
    updateCategory,
    deleteCategory,
    all
} = require('../controllers/category/category.controller');

//middleware
const verfiyAdminAuth = require('../middleware/verfiyAdminAuth');

router.route('/create').post((req,res,next)=>{verfiyUserAuth(req,res,next);}, createCategory);
router.route('/update/:id').put((req,res,next)=>{verfiyUserAuth(req,res,next);}, updateCategory);
router.route('/delete/:id').delete((req,res,next)=>{verfiyUserAuth(req,res,next);}, deleteCategory);
router.route('/all').get((req,res,next)=>{verfiyUserAuth(req,res,next);}, all);



module.exports = router;
