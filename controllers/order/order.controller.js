const Order = require('../../model/Order');
const {Cart} = require('../../model/Cart');
const errorResponse  = require('../../utils/errorResponse');
const SuccessResponse = require('../../utils/successResponse');
const User = require('../../model/User');

exports.makeOrder = async (req,res,next)=>{
    try {
        const{
            cart_id,
            address,
            city,
            postalCode,
            country,
            phone,
            paymentMethod,
        } = req.body;

        if(cart_id==undefined){
          throw new Error('something wen wrong');
        }
        //current authed user
      const current_userid = req.user._id;   
      //create new Order
      const shippingAddress = {
        address:address,
        city:city,
        postalCode:postalCode,
        country:country,
        phone:phone
      };

      const createOrder = await Order({
        shippingAddress:shippingAddress,
        paymentMethod:paymentMethod,  
      });

      //git cart for current user
      var user_id = undefined;
      const findCartUser = await Cart.findById(cart_id)
            .populate('user')
            .exec()
            .then(cart=>{
              user_id = cart.user._id;  
            });

      const _cart = await Cart.findById(cart_id);

      //check if requested user === user returned form cart
      if(user_id != current_userid){
        throw new Error('some thing went worng');
      }

      //git total price form cart
      createOrder.shippingPrice = _cart.totalPrice;
      createOrder.totalPrice = _cart.totalPrice - createOrder.taxPrice ;

      //git items form cart
      createOrder.orderItems = _cart.items;

      //refer to user
      createOrder.user = current_userid ; 
    //save changes  
    const save = await createOrder.save();

   // add this to user shopping orders
     const user = await User.findById(current_userid);
           user.shoppingOrders.push(save._id);
           user.save();

   //remove this cart
      await _cart.delete();
    //success response here
    return SuccessResponse(res,200,"orderCreated Succefully !",createOrder);

    } catch (err) {
       return errorResponse(res,500,err.message);
    }
}