Parse.Cloud.define('totalDonations', function(req, res) {
  // needs work
  res.success('767') // placeholder
})

Parse.Cloud.define('personalDonations', function(req, res) {
  var gateway = require('../helpers/braintree_gateway.js').gateway

  var stream = gateway.transaction.search(
    function (search) {
      search.customerEmail().is(req.user.attributes.email)
    },
    function (err, response) {
      var amounts = []
      response.each(function (err, transaction) {
        amounts.push(transaction.amount)
        console.log(amounts)
      })
    }
  )
})
