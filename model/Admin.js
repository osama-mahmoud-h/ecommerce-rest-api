const mongoose = require("mongoose");
const Joi = require('joi');

const adminSchema = new mongoose.Schema({
  username: {
     type: String, 
     required: [true,"username shouldnt be empty"] ,
     min:6,
     max:200
    },
  email: { 
    type: String, 
    required: [true,"email shouldnt be empty"],
    unique:true,
   },
  password: { 
    type: String ,
    required:[true,"you must add password"],
    minlength:6,
    max:1024,
    select:false,
  },
  date:{
    type:Date,
    default:Date.now()
  },
  role:{
    type:String,
    default:"admin"
  },
  authorizations:[{
      type:String,
      required:true
  }],
});

const Admin= mongoose.model("Admin", adminSchema);

const validate = (user)=>{
  const schema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required()
  });
  return schema.validate(user);
}

module.exports = Admin;