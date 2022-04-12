const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity:{
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1']
    },
    totalPrice: {
        type: Number,
        required: true
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    items:[itemSchema],
    totalPrice:{
        type:Number,
        default:0
    },
    totalItems:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

const Cart = mongoose.model('Cart',cartSchema);
module.exports = {Cart};