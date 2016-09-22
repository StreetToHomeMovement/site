var gateway = require('../helpers/braintree_gateway.js').gateway




Parse.Cloud.define('totalDonations', function(req, res) {
  Parse.Cloud.useMasterKey() // pass this as option into query

  q = new Parse.Query('User')
  q.exists('braintreeCustomerId')
  q.find().then(function(users) {
    console.log('success')
    for (i = 0; i < users.length; i++) {

      var braintreeCustomerId = users[i].get('braintreeCustomerId')
      var firstname = users[i].get('firstname')

      // brainvault
      var total = 0
      var stream = gateway.transaction.search(function (search) {
        search.customerId().is(braintreeCustomerId)
      }, function (err, response) {
        
        response.each(function (err, transaction) {
          total += transaction.amount
        })
      })

    }
  })
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
