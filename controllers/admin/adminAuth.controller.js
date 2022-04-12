const Admin = require("../../model/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const Token = require('../../model/token');
//const sendEmail = require("../../utils/sendEmail");
//const crypto = require("crypto");
//validation user input validation
//const Joi = require("@hapi/joi");

exports.login = async(req,res,next)=>{
    const {email,password} = req.body;
   // console.log(req.body);
 //res.json({email,password});
    if(!email||!password){
       return res.status(400).json({
          success:false,
          error:"you should provide email",
       });
    }
    try{
       const admin =await Admin.findOne({email}).select("+password");
 
       if(!admin){
          return res.status(404).json({success:false, error:"invalid credentials"})
       }
       const isMatch = await bcrypt.compare(password,user.password);
       if(!isMatch){
          return res.status(404).json({success:false, error:"invalid credentials"})
       }
 
       //send the  token
       const payload = {
          _id:admin._id,
          role:admin.role 
       }
       const token = jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          {expiresIn:"7d"},
          (err,token)=>{
             if(err){
                return res.json({
                   success:false,
                   error:err.message
                  });
             }
             res.cookie("_token",token, {
                maxAge:1000*60*60*24*7,// 7day
                httpOnly: true,
                //secure: true, // only works on https
              });
             
             return res.status(200).json({
                success:true,
                username:admin.username,
                role:admin.role,
             })
          }
          );
 
    }catch(err){
       return res.status(500).json({success:false,error:err.message})
    }
  }
 
 exports.logout = (req,res,next)=>{
    try{
       res.clearCookie('_token');
       return res.status(201).json({
          success:true,
          message:"logged out succefully"
       });
    }catch(err){
       return res.status(401).json({
          success:false,
          error:err.message
       });
    }
   
 }
 
