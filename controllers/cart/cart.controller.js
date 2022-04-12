const { Cart } = require("../../model/Cart");
const {Product} = require('../../model/Product');
exports.addItemToCart = async(req,res,next)=>{

    try {
      
        const{
           // userId,
            productId
        } = req.body;
        //will appear for loggedin users
         var userId = req.user._id;

        const quantity = Number.parseInt(req.body.quantity);

         //===== Get Details of Selected product
         const productSelected = await Product.findById(productId);
          if(!productSelected){
            throw new Error('product not found');
          }

        /*====== Get Cart Belongs To Current User=========*/
        let cart = await Cart.findOne({user:userId});
        if(!cart){
             //add new cart to current user
             cart = Cart();
             cart.user=userId;
             //save cart 
              await cart.save();
        }
       
            //srearch if item exists in cart or not  
            //let itemIndex = cart.products.findIndex(p => p.productId == productId);
            let itemIndex = cart.items.findIndex(obj=>{return obj.productId == productId;});
            if(itemIndex>-1){
                let oldQuantity = cart.items[itemIndex].quantity;
                cart.items[itemIndex].quantity=quantity;
                cart.items[itemIndex].totalPrice=quantity*(productSelected.price);
                cart.totalItems+=quantity-oldQuantity;
                cart.totalPrice+=(quantity-oldQuantity)*(productSelected.price);
            }else{
                //product doesn't exists in cart ,so add new item
                const newItem = {
                    productId:productId,
                    quantity:quantity,
                    totalPrice:quantity*(productSelected.price)
                };
                cart.items.push(newItem);
                cart.totalItems+=quantity;
                cart.totalPrice+=newItem.totalPrice;
            }
            //save product
            var save =  await cart.save();
          
    return res.status(201).json({
        success:true,
        message:"added to cart succefully",
        data:save
    })
    }catch (err) {
        return res.status(501).json({
            success:false,
            error:err.message
        })
    }
}
