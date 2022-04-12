const mongoose = require('mongoose');
const Joi = require('joi');

const testSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    arr:[{
        type:String
    }]
});
const validate = (test)=>{
    const schema = Joi.object({
        name:Joi.string().required(),
    });
  return schema.validate(test);
}
const Test = mongoose.model('Test',testSchema);

module.exports = {Test,validate};