Parse.Cloud.define('totalDonations', function(req, res) {
  Parse.Cloud.useMasterKey() // pass this as option into query

  q = new Parse.Query('User')
  //q.exists('braintreeCustomerId')
  q.find().then(function(users) {
    for (i = 0; i < 1; i++) {
      var user = users[i]
      personalDonations(user)
    }
  })
})

function personalDonations(user) {
  var braintreeCustomerId = user.get('braintreeCustomerId')
  console.log('searching vault for ' + braintreeCustomerId)

  var stream = gateway.transaction.search(function (search) {
      search.customerId().is(braintreeCustomerId)
    },
    function (err, response) {
      if (err) {
        console.error(err)
      }

      var amounts = []
      response.each(function (err, transaction) {
        amounts.push(parseFloat(transaction.amount))
        if (amounts.length === response.ids.length) {
          var total = amounts.reduce((a, b) => a + b, 0)
          console.log(total)
          user.set('totalDonations',total)
          user.save().then(
        		function success(u) {
              console.log('totalDonations updated for user ' + u.id)
            },
        		function error(err) {
              console.error(err)
            }
          )
        }
      })
    }
  )

}
