var gateway = require('../helpers/braintree_gateway.js').gateway
var passwordGenerator = require('generate-password')
// try to refactor by chaining promises twice with "then"

Parse.Cloud.define('makeTemporaryPassword', function(req, res) {
  // generate unique random password
  var password = passwordGenerator.generate({
    length:15,
    numbers: true
  })
  res.success(password)
})

Parse.Cloud.define('totalDonations', function(req, res) {
  // needs work
  res.success('767') // placeholder
})

Parse.Cloud.define('linkBraintreeWithDb', function(req, res) {
  Parse.Cloud.useMasterKey()

  var email = req.user.attributes.email
  var payment_method_nonce = req.params.payment_method_nonce
  var amount = req.params.amount
  var subscription = req.params.subscription


  if (subscription) {

    gateway.customer.create({
      email: email,
      paymentMethodNonce: payment_method_nonce
    }, function (err,result) {
      console.error(err)
      console.log(result)
      var customer_id = result.customer.id
      // now that we created a customer, lets make subscription
      gateway.subscription.create({
        planId: "monthly10",
        paymentMethodToken: result.customer.paymentMethods[0].token
      }, function (err,result) {
        console.error(err)
        console.log(result)
        req.user.set('braintreeCustomerId',customer_id)
        req.user.save().then( function success(obj) {
            console.log('set user ' + req.user + ' with braintree ' + customer_id)
            res.success(customer_id)
          }, function error(err) {
            console.error(err)
          }
        )

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
      var customer_id = result.transaction.customer.id
      // now that we made a transaction, lets store the
      // email - braintree id hash in our db
      req.user.set('braintreeCustomerId',customer_id)
      req.user.save().then( function success(obj) {
          console.log('set user ' + req.user + ' with braintree ' + customer_id)
          res.success(customer_id)
        }, function error(err) {
          console.error(err)
        }
      )

    })

  }


})

Parse.Cloud.define('personalDonations', function(req, res) {

  var stream = gateway.transaction.search(
    function (search) {
      search.customerEmail().is(req.user.attributes.email)
    },
    function (err, response) {
      var amounts = []
      response.each(function (err, transaction) {
        amounts.push({
          amount: transaction.amount,
          createdAt: transaction.createdAt
        })
        if (amounts.length === response.ids.length) {
          console.log(amounts)
        }
      })
    }
  )
})
