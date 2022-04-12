const {Test,validate} = require('../model/Test');
const path = require('path');
const fileUploader = require("../utils/fileUploader");
const {Cart} = require('../model/Cart');

exports.createTest = async(req,res,next)=>{
   try{ // fileUploader(req,res,next,1000000,"admin",'')
      // throw new Error('oops');
      console.log("شغال لحد هنا ");
     // const _hh= await Cart.find();
      var userid =null ;
       const _cart = await Cart.findById('623d6c4a709c99a33710c692').populate('user').exec()
       .then(cart=>{
         console.log(cart.user._id);
         userid = cart.user._id;

       });

      //check if req.user._id === cart.user._id
       
      
      return res.json({dataaa:"bbb",
      id:userid
      })
      /*
    const {
        name,
        arr,
        myfile
    } = req.body;
    console.log(req.body);
//return res.json({});
   const MAX_FILE_SIZE = 1*1024*1024;

    const mimetype = new Set();
    mimetype.add("image/png");
    mimetype.add("image/jpeg");
    mimetype.add("image/jpg");

    //['image/png','image/jpg','image/jpeg'];
   // console.log(mimetype.values)
    const _file = fileUploader(req,res,next,MAX_FILE_SIZE,undefined,mimetype);
    await _file(req,res);

    const files=req.files;

  //  console.log("filat: ",files,"name: ",req.body.name);

    files.forEach((file) => {
      // console.log(file.filename,", mimetype: ",file.mimetype);

    });
    var imgarray=req.body.categories;
  //  console.log(imgarray.indexOf("google"),imgarray.indexOf("amazon"));
    //create test object
    console.log("req.body: ", (req.body)['name']);
    const {errors} =  validate(req.body);
    if(errors){
    //  console.log("req.body: ", (errors));
      return res.json({err:errors});
    }
    var newTest = await Test({
        name:req.body.name
    });
   newTest.arr = req.body.categories;
    const saveTest = await newTest.save();
     

    return res.status(201).json({
        success:true,
        message:"goood! ",
        data:req.body
    });*/
   }catch(err){
       return res.status(501).json({
           success:false,
           error:err.message
       });
   }  
}

exports.updateTest = async (req,res,next)=>{
  try{
    
    const {
      name,
      arr
    } = req.body;

    const id = req.params.id;
    const test = await Test.findById(id);

    if(!test){
      return res.status(401).json({
        success:false,
        message:"test not found!"
      });
    }
    
    //update and save
    test.arr = arr;
    const save = await test.save();
   
    return res.status(201).json({
      success:true,
      message:"succefully updated!",
      data:save
    });

  }catch(err){
    return res.status(501).json({
      success:false,
      error:err.message
    });
  }
}