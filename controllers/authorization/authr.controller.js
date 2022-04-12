const Authorization = require('../../model/Authorization');

exports.addAuthorization = (req,res,next)=>{
    try {
        const {
            authrName,
        } = req.body;
    //find auth if found before
    let oldAuthr = await Authorization.findOne({authrName:authrName});
    if(oldAuthr){
        throw new Error('this auhorization already exists');
    }    
    let newAuthr = await Authorization({
        authrName:authrName
    });
    let save = await newAuthr.save();
    
    return res.status(201).json({
        success:true,
        message:"authorization added succefully",
        data:save
    })
    } catch (err) {
        return res.status(501).json({
            success:false,
            error:err.message
        })
    }
}

exports.updateAuthorization = (req,res,next)=>{
    try {
        const{
            authrName  
        }=req.body;
        //check if this name already found
        let oldAuthr = await Authorization.findOne({authrName:authrName});
        if(oldAuthr){
            throw new Error('this auhorization already exists');
        }

        let authr = await Authorization.findById({_id:req.params.id});
        if(!authr){
            throw new Error("authorization name not found! ");
        }
        
        authr.authrName=authrName;
        let save =await Authorization.save();

            return res.status(201).json({
            success:true,
            message:"authorization updated succefully",
            data:save
        });
    } catch (err) {
        return res.status(501).json({
            success:false,
            error:err.message
        })
    };
}


exports.deleteAuthorization =  (req,res,next)=>{
    try {
        let authr = await Authorization.findById({_id:req.params.id});
        if(!authr){
            throw new Error("authorization name not found! ");
        }
        let _delete = await Authorization.delete();

            return res.status(201).json({
            success:true,
            message:"authorization deleted succefully",
            data:_delete
        });
    } catch (err) {
        return res.status(501).json({
            success:false,
            error:err.message
        })
    };
}

exports.allAuthorization = (req,res,next)=>{
    try {
       
        let authorizations = await Authorization.find({});
       /* if(!authorizations){
            throw new Error("authorization name not found! ");
        }*/

            return res.status(201).json({
            success:true,
            message:"authorizations get succefully",
            data:authorizations
        });
    } catch (err) {
        return res.status(501).json({
            success:false,
            error:err.message
        })
    };
}

