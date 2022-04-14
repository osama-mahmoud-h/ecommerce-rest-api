const {SuperAdmin} = require("../model/SuperAdmin");
const Admin = require('../../model/Admin');

/*exports.addAuthorization = async(req,res,next)=>{
    try{
        const{auth} = req.body;

    }catch(err){
        return res.status(501).json({
            success:false,
            error:err.message
        });
    }
}*/
exports.addAdmin = async(req,res,next)=>{
    const {username,email,password} = req.body;
    try{
       //check if user already exist
    const oldAdmin = await Admin.findOne({email});
    if(oldAdmin){
       return res.status(400).json({
           success:true,
           error:"email already exists"
       });
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
       const admin = await Admin.create({
          username:username,
          email:email,
          password:hashedPassword,
       });
       //save new user
       const saveAdmin = await admin.save();
      return res.status(200).json({
         success:true,
         message:"admin created succefully",
         data:admin.username
      })
 
    }catch(err){
      return res.status(501).json({
         success:false,
         error:err.message,
      });
    }
}

exports.deleteAdmin = async(req,res,next)=>{
    try{
        const {admin_id} = req.body;
        const admin = await Admin.findById({admin_id});
    
        if(!admin){
            return res.status(400).json({
                success:false,
                error:"admin not found"
            });
        }
       const deleteAdmin = await admin.delete();
        return res.status(201).json({
            success:true,
            message:"admin deleted Succefully",
            data:deleteAdmin
        });
    }catch(err){
        return res.status(501).json({
            success:false,
            error:err.message
        });
    }
}
/*
exports.assignAuthToAdmin = async(req,res,next)=>{
    try{
        const{admin_id,authorization} = req.body;
        const admin = await Admin.findById({admin_id});
        if(!admin){
            return res.status(400).json({
                success:false,
                error:"admin not found"
            });
        }
        return res.status(201).json({
            success:true,
            message:"admin deleted Succefully",
            data:deleteAdmin
        });
     //   const adminAuthList = await admin.auth

    }catch(err){
        return res.status(501).json({
            success:false,
            error:err.message
        });
    }
}
*/

