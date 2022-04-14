const paypal_config = (paypal)=>{
    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': 'Ae33S6mq0vGT8hJ4Pk3tsHpY9Yn-Xp4zKXbKISpGSlBD4tSqz4ZsHIsshxzJ2OsbwEdgB5ioacVS1Jfr',
        'client_secret': 'EELaNY5sEOGETfUyKkqx3p94Q666ARsCA1oQsxhpAR55nWQnpqjpYONnMi6jRZFaA8_cW9gfM161ek8E'
      });
}

module.exports = {paypal_config} ;