const {Category,validate} = require('../../model/Category');

exports.createCategory = async(req,res,next)=>{
    try{
        const{name} = req.body;
        const{error} = validate(req.body);
       
        if(error){
            res.status(401).json({
                success:false,
                error:error.message
            });
        }
        //check if category already found 
        const oldCategory = await Category.findOne({name:name});
        if(oldCategory){
            return res.status(501).json({
                success:false,
                error:"category already found choose another name",
            })
         }
        //create new one  
        const newCategory = Category({
            name:name
        });

        const save = await newCategory.save();

        return res.status(201).json({
            success:true,
            message:"category created succefully"
        });  

    }catch(err){
        res.status(501).json({
            success:false,
            error:err.message
        });
    }
}
exports.updateCategory = async(req,res,next)=>{
    try{
        const{
            name
        } = req.body;
        //check if name already found
        const oldCategory = await Category.findOne({name:name});
        if(oldCategory){
            return res.status(501).json({
                success:false,
                error:"category already found choose another name",
            })
         }

    var category = await Category.findById(req.params.id);

    if(!category){
        return res.status(401).json({
            success:false,
            error:"category not found"
        })
    }
     //update
     category.name = name;
     const save = await category.save();

     return res.status(201).json({
         success:true,
         message:"name updated succefully",
         data:save
     })
    }catch(err){
        return res.status(501).json({
            success:false,
            error:err.message
        })
    }
}
exports.deleteCategory = async(req,res,next)=>{
    try{
        const category = await Category.findById({_id:req.params.id});
        if(!category){
            return res.status(401).json({
                success:false,
                error:"category not found",
            }); 
        }
       const deleteted = await category.delete();

        return res.status(201).json({
            success:true,
            message:"category deleted succefully",
            data:deleteted
        });
    }catch(err){
        res.status(501).json({
            success:false,
            error:err.message
        });
    }
}
exports.all = async(req,res,next)=>{
    try{
        const allCategories = await Category.find({});
        return res.status(201).json({
            success:true,
            message:"categories found succefully",
            data:allCategories
        });
    }catch(err){
        res.status(501).json({
            success:false,
            error:err.message
        });
    }
}