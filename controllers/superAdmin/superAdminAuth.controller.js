const {SuperAdmin} = require("../model/SuperAdmin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require('../model/token');
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
//validation user input validation
const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
   username :Joi.string().min(3).required(),
   email:Joi.string().min(6).required().email(),
   password:Joi.string().min(6).required(),
});

exports.register = async(req,res,next)=>{
   const {username,email,password} = req.body;
   try{
      //check if user already exist
   const oldUser = await SuperAdmin.findOne({email});
   if(oldUser){
      res.status(400).send("email already exists");
      return false;
   }
   //validate input data
   const {error} = await registerSchema.validateAsync(req.body);
      if(error){
          return registerSchema.status(400).json({
             success :false,
             error: error.details[0].message
         });
      }  
      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password,salt);

      //add new user
      const user = await SuperAdmin.create({
         username:username,
         email:email,
         password:hashedPassword,
      });
      //save new user
      const saveUser = await user.save();
     return res.status(200).json({
        success:true,
        message:"user created succefully",
        data:user.username
     })

   }catch(err){
     return res.status(501).json({
        success:false,
        error:err.message,
        
     });
   }
};

exports.login = async(req,res,next)=>{
   const {email,password} = req.body;
   console.log(req.body);
//res.json({email,password});
   if(!email||!password){
      return res.status(400).json({
         success:false,
         error:"you should provide email",
      });
   }
   try{
      const user =await SuperAdmin.findOne({email}).select("+password");

      if(!user){
         return res.status(404).json({success:false, error:"invalid credentials"})
      }
      const isMatch = await bcrypt.compare(password,user.password);
      if(!isMatch){
         return res.status(404).json({success:false, error:"invalid credentials"})
      }

      //send the  token
      const payload = {
         _id:user._id,
         role:user.role
       
      }
      const token = jwt.sign(
         payload,
         process.env.TOKEN_SECRET,
         {expiresIn:"5d"},
         (err,token)=>{
            if(err){
               return res.json({error:err});
            }
            res.cookie("_token",token, {
               maxAge:5000*60*60*24,// 1day
               httpOnly: true,
               //secure: true, // only works on https
             });
             //console.log("loginCookie: ",res.cookie._token);
          /*  res.cookie("access_token",token,{
               httpOnly:false,
               expiresIn:Date.now()+48000,
            });*/
            return res.status(200).json({
               success:true,
               token:"Bearer "+token,
               username:user.username,
               role:user.role,
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

 exports.forgotpassword = async(req,res,next)=>{
      try {
       
       const user = await SuperAdmin.findOne({ email: req.body.email });
       if (!user)
           return res.status(400).json({
              success:false,
              error:"user with given email doesn't exist"
            });

       let token = await Token.findOne({ userId: user._id });
       if (!token) {
           token = await new Token({
               userId: user._id,
               token: crypto.randomBytes(32).toString("hex"),
           }).save();
       }

       const link = `${process.env.BASE_URL}/resetpassword/${user._id}/${token.token}`;
       await sendEmail(user.email, "Password reset", link,res);

       res.status(201).json({
          success:true,
          message:"password reset link sent to your email account"
       });

   } catch (err) {
       res.status(501).json({
          success:false,
          error:err.message
       });
       console.log(err);
   }
}

 exports.resetpassword = async(req,res,next)=>{
    const {password} = req.body;

    try{
    const user = await SuperAdmin.findById(req.params.userId);
        if (!user) return res.status(401).json({
           success:false,
           error:"invalid link or expired"
        });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).json({
           success:false,
           error:"invalid link or expired"
        });
      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password,salt);
      
        user.password = hashedPassword;
        await user.save();
        await token.delete();

       return res.status(201).send({
          success:true,
          error:"password reset sucessfully."
       });
    } catch (err) {
        res.status(501).json({
           success:false,
           error:err.message
        });
        console.log(err);
    }
 }