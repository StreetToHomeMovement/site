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
    var subscription = req.body.subscription

    if (subscription) {

      gateway.customer.create({
        email: email,
        paymentMethodNonce: payment_method_nonce
      }, function (err,result) {
        console.error(err)
        console.log(result)
        // now that we created a customer, lets make subscription
        gateway.subscription.create({
          planId: "monthly10",
          paymentMethodToken: result.customer.paymentMethods[0].token
        }, function (err,result) {
          console.error(err)
          console.log(result)
          // now that we made a subscription, lets store the
          // email - braintree id hash in our db
          var BraintreeMap = new Parse.Object.extend("BraintreeMap")
          var braintreeMap = new BraintreeMap()
          braintreeMap.set('email',email)
          braintreeMap.save().then( function success(obj) {
            console.log("braintree hash made with id " + obj.id)
          }, function error(err) {
            console.error(err)
          })
        })
      })

    } else {

      gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: payment_method_nonce,
        customer: {
          email: email
        },
        options: {
          storeInVaultOnSuccess: true
        }
      }, function (err,result) {
        console.error(err)
        console.log(result)
        // now that we made a transaction, lets store the
        // email - braintree id hash in our db
        var BraintreeMap = new Parse.Object.extend("BraintreeMap")
        var braintreeMap = new BraintreeMap()
        braintreeMap.set('email',email)
        braintreeMap.save().then( function success(obj) {
          console.log("braintree hash made with id " + obj.id)
        }, function error(err) {
          console.error(err)
        })
      })

    }

  	res.sendFile(path.join(__dirname, '..', '/views/setaccount.html'))
  })

}
