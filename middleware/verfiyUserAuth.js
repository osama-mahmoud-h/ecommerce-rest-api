const jwt = require("jsonwebtoken");
module.exports = (req,res,next,authrs)=>{
 
    try{
        const token = req.cookies._token;
        console.log("auths: ",authrs);
        if(!token){
            throw new Error('access denied');
        }

       const bbb= jwt.verify(token,process.env.TOKEN_SECRET);
       console.log(bbb);
        //verfiy auth.
        jwt.verify(token,process.env.TOKEN_SECRET,(err,decoded)=>{
            if(err){
              throw new Error('faild to authenticate');
            }
            //check role of this user 
            if(decoded.role !== 'user'){
                throw new Error('access deined!');
            }
            req.user = {};
            req.user._id=decoded._id;
            req.user.role=decoded.role;
            next();
        });
    }catch(err){
        return res.status(400).json({
            success:false,
            isLoggedIn:false,
            message:err.message
        });
    }
}
