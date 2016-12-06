function braintreeSetup(amount, subscription) {
  Parse.Cloud.run("braintreeClientToken").then(function(clientToken) {
    braintree.setup(clientToken, 'dropin', {
        container: 'checkout',
        onPaymentMethodReceived: function(result) {

          var returningUser = Parse.User.current() != null

          if (returningUser) {
            var func1 = "createSubscription"
            var func2 = "makeDonation"
          } else {
            var func1 = "createCustomerWithSubscription"
            var func2 = "createCustomerWithDonation"
          }

          if (subscription) {
            // if existing subscription then error
            var existingSubscriptionId = Parse.User.current().attributes.braintreeSubscriptionId

            Parse.Cloud.run(func1, {
              payment_method_nonce: result.nonce,
              amount: amount,
              subscription: subscription
            }).then(function(result) {
              console.log('response: ' + result)
              console.log('thank you for your subscription!')
              if (existingSubscriptionId) {
                Parse.Cloud.run('cancelExistingSubscription', {subscriptionId: existingSubscriptionId}).then(function(result) {
                  console.log(result)
                  window.location.href = '/donors'
                })
              } else {
                if (returningUser != true) {
                  window.location.href = '/setaccount'
                } else {
                  window.location.href = '/donors'
                }
              }
            })

          } else {

            Parse.Cloud.run(func2, {
              payment_method_nonce: result.nonce,
              amount: amount
            }).then(function() {
              console.log('thank you for your donation!')
              if (returningUser != true) {
                window.location.href = '/setaccount'
              } else {
                window.location.href = '/donors'
              }
            })

          }
        }
    })
  })
}
