var gateway = require('../helpers/braintree_gateway.js').gateway
var passwordGenerator = require('generate-password')

Parse.Cloud.define('totalDonations', function(req, res) {
  // needs work
  res.success('767') // placeholder
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
