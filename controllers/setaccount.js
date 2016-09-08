var path = require('path')
var Parse = require('../helpers/parse_server')
var gateway = require('../helpers/braintree_gateway.js').gateway
// try to refactor by chaining "then" twice

module.exports = function(app) {

  app.post('/setaccount', function(req, res) {
    // unmangle variables
    var email = req.cookies.email
    var payment_method_nonce = req.body.payment_method_nonce
    var amount = req.body.amount

    // set up query
    q = new Parse.Query('BraintreeMap')
    q.equalTo('email',req.cookies.email)

    // wuery
    q.first().then(function(existingMap) {
      // if no existing braintreeCustomer create customer in braintree dashboard
      // and add hash to braintreeMap table in our Parse db
      if (existingMap === undefined) {
        gateway.transaction.sale({
          amount: amount,
          paymentMethodNonce: payment_method_nonce,
          customer: {
            email: email
          },
          options: {
            storeInVaultOnSuccess: true
          }
        }, function (err, result) {
          console.log(result.transaction.customer.id)
          var BraintreeMap = new Parse.Object.extend("BraintreeMap")
          var braintreeMap = new BraintreeMap()
          braintreeMap.set('email',email)
          braintreeMap.set('braintreeCustomerId',result.transaction.customer.id)
          braintreeMap.save().then( function success(obj) {
            console.log("braintree hash made with id " + obj.id)
          }, function error(err) {
            console.error(err)
          })
        })
      } else { // add transaction to existing customer
        console.log(existingMap.get('braintreeCustomerId'))
        gateway.transaction.sale({
          amount: amount,
          paymentMethodNonce: payment_method_nonce,
          customerId: existingMap.get('braintreeCustomerId')
        }, function (err, result) {
          if (err) {
            console.error(err)
          } else {
            console.log(result)
          }
        });
      }
    }, function(err) {
      console.error(err)
    })

  	res.sendFile(path.join(__dirname, '..', '/views/setaccount.html'))
  })

}
