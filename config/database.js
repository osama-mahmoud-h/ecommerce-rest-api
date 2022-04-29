const mongoose = require("mongoose");

 const LOCAL_DB_URL = 'mongodb://localhost:27017/store';
const connectDB = ()=>{
   mongoose.connect(process.env.LOCAL_DB_URL,{
    useNewUrlParser: true,
  
  }).then(succ=>{
    console.log("mongodb Connected succefully")})
  .catch(err=>console.log(err.message));
}

module.exports = connectDB;
