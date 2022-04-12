const mongoose = require("mongoose");

const localDB="mongodb://localhost:27017/store";
const cloudDB="mongodb://osamamh:<YOUR-PASSWORD>@cluster0-shard-00-00.6tkmn.mongodb.net:27017,cluster0-shard-00-01.6tkmn.mongodb.net:27017,cluster0-shard-00-02.6tkmn.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-t52da5-shard-0&authSource=admin&retryWrites=true&w=majority";

const connectDB = ()=>{
   mongoose.connect(localDB,{
    useNewUrlParser: true,
  
  }).then(succ=>console.log("mongodb Connected succefully"))
  .catch(err=>console.log(err));
}

module.exports = connectDB;
