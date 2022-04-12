const express = require('express');
const stripe = require('stripe')(process.env.StripeAPIKey);

module.exports.checkout = async(req,res,next)=>{
    try {
        const {
            stripeToken,
        } = req.body;
    if(!stripeToken){
        throw Error('fill all fileds');
    }

    stripe.customers
      .create({
        name: "sameh",
        email: stripeToken.email,
        source: stripeToken,
       /* billing_details:{
            address:{
                city: "fym",
                country: "egypt",
            },
            email:"sameh@gmail.net",
            name: 'semaihi',
            phone: "+201024397931"
          },*/
      })
      .then(customer =>
        stripe.charges.create({
          amount: 73,
          currency: "usd",
          customer: customer.id,
          receipt_email:stripeToken.email,
          

        })
      )
      .then((res) => {
        console.log("suc strip: ",res)
      })
      .catch(err => {
          console.log("err strip: ",err.message)
        /*res.status(500).json({
            success:false,
            message:"payment faild"
        })*/
    });
       /* const charge = await stripe.charges.create({
            amount: 100,
            currency: 'usd',
            source: stripeToken,
            email:email,
    
        });
        if(!charge) throw Error('Payment failed');
        if(charge){
            return res.status(200).json({
                success:true,
                message:"payment successded",
            }); 
        }*/ 

       /* return res.status(200).json({
            success:true,
            message:"payment successded",
        }); */
    } catch (err) {
        return res.status(500).json({
            success:false,
            error:err.message
        });
    }
    
}