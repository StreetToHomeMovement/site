var gateway = require('../helpers/braintree_gateway.js').gateway

Parse.Cloud.define('memberDonations', function(req, res) {
  Parse.Cloud.useMasterKey()

  q = new Parse.Query('User')
  // q.select(['firstname','totalDonations'])
  q.exists('totalDonations')
  q.find().then(function(users) {
    var output = []
    for (i = 0; i < users.length; i++) {
      var user = users[i]
      var j = user.get('firstname')
      var firstname = user.get('firstname')
      var totalDonations = user.get('totalDonations')
      console.log(firstname)
      output.push({
        j: j,
        firstname: firstname || 'Anonymous',
        totalDonations: totalDonations
      })
      if (output.length === users.length) {
        console.log('done')
        res.success(output)
      }
    }
  })
})
