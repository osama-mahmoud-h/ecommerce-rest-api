const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'Ae33S6mq0vGT8hJ4Pk3tsHpY9Yn-Xp4zKXbKISpGSlBD4tSqz4ZsHIsshxzJ2OsbwEdgB5ioacVS1Jfr',
    'client_secret': 'EELaNY5sEOGETfUyKkqx3p94Q666ARsCA1oQsxhpAR55nWQnpqjpYONnMi6jRZFaA8_cW9gfM161ek8E'
  });

const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:5000/api/paypal/success",
        "cancel_url": "http://localhost:5000/api/paypal/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "item1",
                "sku": "001",
                "price": "25.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "25.00"
        },
        "description": "Good products"
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});

