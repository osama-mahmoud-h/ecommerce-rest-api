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

const orderSchema = new  mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'User' //relation betwen the order and the user
    },
    orderItems:[itemSchema],
    shippingAddress:{
        address: { type: String, required:true },
        city: { type: String, required:true },
        postalCode: { type: String },
        country: { type: String, required:true },
        phone: {type:String, required:true }
    },
    paymentMethod:{
        type : String,
        required:true
    },
    paymentResult:{
        id: {type: String },
        status: {type: String },
        update_time: {type: String },
        email_adress: {type: String },
    },
    taxPrice:{
        type : Number,
        required: true,
        default: 0.0
    },
    shippingPrice:{
        type : Number,
        required: true,
        default: 0.0
    },
    totalPrice:{
        type : Number,
        default: 0.0
    },
    isPaid:{
        type : Boolean,
        default:false
    },
    paidAt:{
        type: Date
    },
    isDelivered:{
        type : Boolean,
        default:false
    },
    deliveredAt:{
        type: Date
    },
    date:{
        type:Date,
        default:Date.now()
    }
});


const Order= mongoose.model("Order", orderSchema);

module.exports = Order;