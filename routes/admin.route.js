const express = require("express");
const router = express.Router();
//controllers functions 
const {
    login,
    logout
} = require("../controllers/admin/adminAuth.controller");

//middleware 
const verfiyAdminAuth = require('../middleware/verfiyAdminAuth');

router.route("/login").post(login);

router.route('/logout').get((req,res,next)=>{verfiyAdminAuth(req,res,next);}, logout);

module.exports = router;
