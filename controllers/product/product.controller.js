const {Product,validate} = require('../../model/Product');
const fileUploader = require("../../utils/fileUploader");

exports.createProduct = async(req,res,next)=>{   
    try{ 
   //maxsize for file
   const MAX_FILE_SIZE = 5*1024*1024;
   //only allowed file extensions
   const mimetype = new Set();
   mimetype.add("image/png");
   mimetype.add("image/jpeg");
   mimetype.add("image/jpg");

   //upload images
   const _file = fileUploader(req,res,next,MAX_FILE_SIZE,undefined,mimetype);
   await _file(req,res);

   const files=req.files;
   var fileNames = [];

   if(files!== undefined)
   files.forEach((filename)=>{
       fileNames.push(filename);
   });
   
    const{
        name,
        description,
        categories,
        sizes,
        price,
    } = req.body;

 //return res.json({fasttest:categories});
 
 const newProduct = Product({
            name:name,
            description:description,
            category:categories,
            sizes:sizes,
            price:price,
            images:fileNames
        });
        //save
       const save = await newProduct.save();

        return res.status(201).json({
            success:true,
            message:"product created succefully",
            data:save
        });
    }
    catch(err){
        return res.status(501).json({
            success:false,
            error:err.message
        });
    }
   
}

exports.updateProduct = async(req,res,next)=>{
    try{
        const {
            name,
            description,
            category,
            sizes,
            price,
        } = req.body;

       const id = req.params.id;
       var product = await Product.findById(id);
       if(!product){
          throw new Error('product not found');
       }
       
       //updae each field
       product.name=name;
       product.price = price;
       product.sizes = sizes;
       product.description=description,
       product.category=category;

    //finally save 
    const save = await product.save();

    return res.status(201).json({
        success:true,
        message:"product updated successfully!",
       // data:save
    });

    }catch(err){
        return res.status(501).json({
            success:false,
            error:err.message
        });
    }
}

exports.deleteProduct = async(req,res,next)=>{
    try{
        const {product_id} = req.params.id;

        const deleteproduct = await Product.findById({product_id});
        if(!deleteproduct){
            throw new Error('product not found');
        }

        await deleteproduct.delete();

        return res.status(201).json({
            success:true,
            message:"product deleted succefully"
        });

    }catch(err){
        return res.status(501).json({
            success:false,
            error:err.message
        });
    }
}

exports.allProducts = async(req,res,next)=>{
    try{
        const all = await Product
        .find({});

        return res.status(201).json({
            success:true,
            message:"all products returned succefully",
            data:all
        });
    }
    catch(err){
        return res.status(501).json({
            success:false,
            error:err.message
        }); 
    }
}