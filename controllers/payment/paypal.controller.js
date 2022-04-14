const Order = require("../../model/Order");
var mongoose = require('mongoose');

exports.pay_with_paypal = async (req,res,next,paypal) =>{
    try {
        const {
            order_id
        } = req.body;

         if(order_id == undefined || !order_id){
            // throw new Error("error occured!");
         }
        //get order details
        const user_id = req.user.id;
        //get totola items;
        const order = await Order.findById(order_id);
        if(!order){
            throw new Error("order not found!");
        }
        //get total price
        const totalPrice = "37.0";//order.totalPrice;

        //delete order 

        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": `http://localhost:3000/api/paypal/success?order_id=${order_id}`,
                "cancel_url": "http://localhost:3000/api/paypal/cancel"
            },
            "transactions": [{
                "item_list": {
                },
                "amount": {
                    "currency": "USD",
                    "total": order.totalPrice
                },
                "description": "awesome products"
            }]
        };
    
        return new Promise((fill)=>{
            paypal.payment.create(create_payment_json,(err, payment)=> {
                    if (err) {
                        return res.status(500).json({
                            success:false,
                            error:"something went error! "
                        });        
                    } else {
                        for(let i = 0;i < payment.links.length;i++){
                          if(payment.links[i].rel === 'approval_url'){
                            // console.log("links:_ ", payment.links[i].href);
                               return res.status(200).json({
                                   success:true,
                                   message:"paypal created successfully",
                                   data:payment.links[i].href
                                });
                          }
                        }
                    }
                  });
                
        });
      
    } catch (err) {
        res.status(500).json({
            success:false,
            error:err.message
        })
    }
}


exports.paypal_success = async (req,res,next,paypal)=>{
    try {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const order_id = req.query.order_id;

        //cast of paramer to object id type 
        var objectId = mongoose.Types.ObjectId(order_id);

        const order = await Order.findById(objectId);

        if(!order){
            throw new Error('something went wrong !');
        }

        const execute_payment_json = {
          "payer_id": payerId,
          "transactions": [{
              "amount": {
                  "currency": "USD",
                  "total":order.totalPrice
              }
          }]
        };

        return new Promise(fill=>{
            paypal.payment.execute(paymentId, execute_payment_json, function (er, payment) {
              if (er) {
                  return res.status(500).json({
                      success:false,
                      error:"something went wrong!"
                  });
              } else {
                  //console.log(JSON.stringify(payment));
                 return res.status(200).json({
                   success:true,
                   message:"paypal payment done successfully"
                 });
              }
          });

          //mark order as paid
          order.isPaid = true;
          order.save();
        });
        
    } catch (err) {
        return res.status(500).json({
            success:false,
            error:err.message
        });
    }
}