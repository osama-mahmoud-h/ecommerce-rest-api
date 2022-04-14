const express = require("express");
const router = express.Router();
//controllers functions 
const {
    register,
    login,
    forgotpassword,
    resetpassword,
    logout
} = require("../controllers/user/userAuth.controller");
//middleware 
const verfiyUserAuth = require('../middleware/verfiyUserAuth');

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:userId/:token").put(resetpassword);

router.route('/logout').get((req,res,next)=>{verfiyUserAuth(req,res,next);}, logout);





module.exports = router;
