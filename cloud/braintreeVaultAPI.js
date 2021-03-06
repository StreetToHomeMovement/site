var gateway = require('../helpers/braintree_gateway.js').gateway

Parse.Cloud.define('braintreeClientToken', function(req, res) {
  var braintreeCustomerId = req.user.attributes.braintreeCustomerId
  gateway.clientToken.generate({
    customerId: braintreeCustomerId
  }, function (err, response) {
    var clientToken = response.clientToken
    res.success(clientToken)
  })
})

Parse.Cloud.define('createCustomerWithSubscription', function(req, res) {
  Parse.Cloud.useMasterKey()

  var email = req.user.attributes.email
  var payment_method_nonce = req.params.payment_method_nonce
  var amount = req.params.amount
  var subscription = req.params.subscription

  gateway.customer.create({
    email: email,
    paymentMethodNonce: payment_method_nonce
  }, function (err,result) {
    console.error(err)
    console.log(result)
    var customer_id = result.customer.id
    // now that we created a customer, lets make subscription
    gateway.subscription.create({
      planId: "monthly" + amount,
      paymentMethodToken: result.customer.paymentMethods[0].token
    }, function (err,result) {
      console.error(err)
      console.log(result)
      req.user.set('braintreeCustomerId',customer_id)
      req.user.set('braintreeSubscriptionId',result.subscription.id)
      req.user.save().then( function success(obj) {
          console.log('set user ' + req.user + ' with braintree ' + customer_id)
          res.success(customer_id)
        }, function error(err) {
          console.error(err)
        }
      )
    })
  })
})

Parse.Cloud.define('createCustomerWithDonation', function(req, res) {
  Parse.Cloud.useMasterKey()

  var email = req.user.attributes.email
  var payment_method_nonce = req.params.payment_method_nonce
  var amount = req.params.amount

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
    var donation_amount = parseFloat(result.transaction.amount)
    req.user.set('braintreeCustomerId',customer_id)
    req.user.set('totalDonations',donation_amount)
    req.user.save().then( function success(obj) {
        console.log('set user ' + req.user + ' with braintree ' + customer_id)
        res.success(customer_id)
      }, function error(err) {
        console.error(err)
      }
    )
  })
})

Parse.Cloud.define('createSubscription', function(req, res) {
  var email = req.user.attributes.email
  var payment_method_nonce = req.params.payment_method_nonce
  var amount = req.params.amount
  var subscription = req.params.subscription

  gateway.subscription.create({
    planId: "monthly" + amount,
    paymentMethodNonce: payment_method_nonce
  }, function (err,result) {
    console.error(err)
    console.log(result)
    var subscriptionId = result.subscription.id
    req.user.set('braintreeSubscriptionId',subscriptionId)
    Parse.Cloud.useMasterKey()
    req.user.save().then( function success(obj) {
        console.log('user ' + req.user.id + ' subscription set to ' + subscriptionId)
        res.success(subscriptionId)
      }, function error(err) {
        console.error(err)
      }
    )
  })
})

Parse.Cloud.define('makeDonation', function(req, res) {
  var email = req.user.attributes.email
  var payment_method_nonce = req.params.payment_method_nonce
  var amount = req.params.amount

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
    var donation_amount = parseFloat(result.transaction.amount)
    req.user.set('totalDonations',req.user.get('totalDonations') + donation_amount)
    Parse.Cloud.useMasterKey()
    req.user.save().then( function success(obj) {
        console.log('user ' + req.user.id + ' added donation_amount ' + donation_amount)
        res.success(donation_amount)
      }, function error(err) {
        console.error(err)
      }
    )
  })
})

Parse.Cloud.define('deleteAllPaymentMethods', function(req, res) {
  var customerId = req.user.attributes.braintreeCustomerId
  console.log('customerId: ' + customerId)
  gateway.customer.find(customerId, function (err, customer) {
    if (err) {
      console.error(err)
    } else {
      for (i = 0; i < customer.paymentMethods.length; i++) {
        var paymentMethodToken = customer.paymentMethods[i].token
        console.log(paymentMethodToken)
        gateway.paymentMethod.delete(paymentMethodToken, function (err, result) {
          if (err) {
            console.error(err)
          } else {
            console.log('paymentMethod erased: ' + paymentMethodToken)
            // we should really run this after we know ALL paymentMethods were deleted not just the first one
            res.success('erased at least one paymentMethod')
          }
        })
      }
    }
  })
})

Parse.Cloud.define('cancelExistingSubscription', function(req, res) {
  var existingSubscriptionId = req.params.subscriptionId
  gateway.subscription.cancel(existingSubscriptionId, function (err, result) {
    if (err) {
      console.log(err)
    } else {
      console.log('canceled subscription ' + existingSubscriptionId)
      res.success('canceled subscription ' + existingSubscriptionId)
    }
  })
})
