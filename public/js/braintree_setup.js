function braintreeSetup(returningUser, amount, subscription) {
  Parse.Cloud.run("braintreeClientToken").then(function(clientToken) {
    braintree.setup(clientToken, 'dropin', {
        container: 'checkout',
        onPaymentMethodReceived: function(result) {

          alert(amount)

          // var radios = document.getElementsByName('amount');
          // var amount
          // for (var i = 0, length = radios.length; i < length; i++) {
          //     if (radios[i].checked) {
          //         // do whatever you want with the checked radio
          //         amount = radios[i].value
          //         // only one radio can be logically checked, don't check the rest
          //         break;
          //     }
          // }
          //
          // var subscription
          // if (document.getElementById('subscription').checked) {
          //   subscription = true
          // } else {
          //   subscription = false
          // }

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
                  window.location.href = '/user'
                })
              } else {
                if (returningUser != true) {
                  window.location.href = '/setaccount'
                } else {
                  window.location.href = '/user'
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
                window.location.href = '/user'
              }
            })

          }
        }
    })
  })
}
