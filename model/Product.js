const mongoose = require('mongoose');
const Joi = require('joi');
//const Review = require('./Review');


const reviewSchema = new mongoose.Schema({
    name : { type: String, required: true},
    rating : { type: Number, required: true},
    comment : { type: String, required: true},

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'User' //relation betwen the review and the user
    },

    date:{
        type:Date,
        default:Date.now()
    }

});


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    images:[{
        type:String,
    }],
    description:{
        type : String,
        required: true
    },
    category:[{
        type : String,
        required: true
    }],
    sizes:[{
        type : String,
        required: true
    }],
    price:{
        type : Number,
        required: true,
        default: 0
    },
    rating:{
        type : Number,
        required: true,
        default: 0
    },
    numReviews:{
        type : Number,
        required: true,
        default: 0
    },
    reviews: [reviewSchema],
    countInStock:{
        type : Number,
        required: true,
        default: 0
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

const validate = (product)=>{
    const schema = Joi.object({
          name:Joi.string().required(),
          description:Joi.string().required(),
          price:Joi.number().required(),
      });
    return schema.validate(product);
}
const Product = mongoose.model("Product", productSchema);

module.exports = {Product,validate};