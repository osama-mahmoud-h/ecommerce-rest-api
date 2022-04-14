const express = require('express');
const Order = require('../../model/Order');
const User = require('../../model/User');
const stripe = require('stripe')(process.env.StripeAPIKey);

module.exports.stripeCheckout = async(req,res,next)=>{
    try {
        const {
            stripeToken,
            order_id
        } = req.body;

         if(!stripeToken){
            throw Error('fill all fileds');
        }
    //get name of current user
   //  const user_id = req.user._id;
   // const currentUser = await User.findById(user_id);
    
    //current order
    const order = await Order.findById(order_id);
    if(!order){
        throw new Error('order not found!');
    }

    stripe.customers
      .create({
        name: "osama",
        email: stripeToken.email,
        source: stripeToken
      })
      .then(customer =>
        stripe.charges.create({
          amount: (order.totalPrice)*100,
          currency: "usd",
          customer: customer.id,
          receipt_email:stripeToken.email,
          description:"buying order"

        })
      )
      .then(async (resp) => {
        //make order paid
        order.isPaid = true;
        await order.save();

        res.status(200).json({
            success:true,
            message:"payment succeded!"
        });

      })
      .catch(err => {
        throw new Error(err.message);
    });
     
    } catch (err) {
        return res.status(500).json({
            success:false,
            error:err.message
        });
    }
    
}