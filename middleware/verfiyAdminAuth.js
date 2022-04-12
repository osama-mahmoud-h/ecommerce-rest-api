const jwt = require("jsonwebtoken");
const Admin = require('../model/Admin');
const ErrorResponse = require('../utils/errorResponse');

module.exports = async(req,res,next)=>{
    try{
        const token = req.cookies._token;

        if(!token){
            throw new Error('access denied');
        }
        //verfiy auth.
        jwt.verify(token,process.env.TOKEN_SECRET, async (err,decoded)=>{
            if(err){
               return ErrorResponse(res,500,"access denied");
            }
            //check role of this user 
            if(decoded.role !== 'admin'){
               return ErrorResponse(res,500,"access denied--");
            }
        
            req.user = {};
            req.user._id=decoded._id;
            req.user.role=decoded.role;
            next();
        });
    }catch(err){
       return ErrorResponse(res,500,err.message);
    }
}
