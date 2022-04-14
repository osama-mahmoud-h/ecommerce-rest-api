const express = require("express");
const router = express.Router();

//controllers functions 
const {
    register,
    login,
    forgotpassword,
    resetpassword,
    logout
} = require("../controllers/superAdminAuth.controller");

const{
    addAdmin,
    deleteAdmin
} = require('../controllers/superAdmin/superAdmin.controller');
//middleware
const verfiySuperAdminAuth = require('../middleware/verfiySuperAdminAuth');

router.route("/register").post(verfiySuperAdminAuth, register);

router.route("/login").post(verfiySuperAdminAuth, login);

router.route("/forgotpassword").post(verfiySuperAdminAuth, forgotpassword);

router.route("/resetpassword/:userId/:token").put(verfiySuperAdminAuth,resetpassword);

router.route('/logout').get(verfiySuperAdminAuth,logout);

router.route('/add-admin').post(verfiySuperAdminAuth,addAdmin);

router.route('/delete-admin').post(verfiySuperAdminAuth,deleteAdmin);

module.exports = router;