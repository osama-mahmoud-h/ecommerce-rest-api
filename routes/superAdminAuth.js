const express = require("express");
const router = express.Router();

//controllers functions 
const {
    register,
    login,
    forgotpassword,
    resetpassword,
    logout
} = require("../controllers/superAdmin/superAdminAuth.controller");

const{
    addAdmin,
    deleteAdmin
} = require('../controllers/superAdmin/superAdmin.controller');
//middleware
const verfiySuperAdminAuth = require('../middleware/verfiySuperAdminAuth');

router.route("/register").post((req,res,next)=>{verfiySuperAdminAuth(req,res,next)}, register);

router.route("/login").post((req,res,next)=>{verfiySuperAdminAuth(req,res,next)}, login);

router.route('/logout').get((req,res,next)=>{verfiySuperAdminAuth(req,res,next)},logout);

router.route('/add-admin').post((req,res,next)=>{verfiySuperAdminAuth(req,res,next)},addAdmin);

//router.route('/delete-admin').post(verfiySuperAdminAuth,deleteAdmin);

module.exports = router;