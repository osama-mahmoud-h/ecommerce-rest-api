const multer = require("multer");
const util = require('util');

const path =require("path");
const filedata = undefined;

const fileUploader =  (req,res,next,fileSize,_path,extensions)=>{

    const storage =  multer.diskStorage({
        destination:path.join(__dirname,"/../public/uploads/"+(_path===undefined?'':_path)),
        filename:(req,file,callback)=>{
           // console.log('path uni:' ,_path==undefined);
            callback(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname));     
        }   
    });


    const upload = multer({
        storage:storage,
        limits:{
          fileSize:fileSize==undefined?(5*1024*1024):fileSize, //1 mega     
        },
        fileFilter:(req,file,callback)=>{
                 if(extensions.has(file.mimetype)){
                    return callback(null, true);
                 }
                else{
                    console.log("after")
                    callback(null, false);
                    const err = new Error(`this file is not supported`);
                    err.name = 'ExtensionError';
                    return callback(err);  
                }   
        }
        /*fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true);
            } else {
                cb(null, false);
                const err = new Error('Only .png, .jpg and .jpeg format allowed!')
                err.name = 'ExtensionError'
                return cb(err);
            }
        }*/
    }).array("image",2);

let fileUploadMiddleware = util.promisify(upload);
    
return fileUploadMiddleware;
}

module.exports = fileUploader;