const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now()
    }
});
const validate = (category)=>{
    const schema = Joi.object({
          name:Joi.string().required(),
      });
    return schema.validate(category);
}
const Category  = mongoose.model('Category',categorySchema);

module.exports = {Category,validate};