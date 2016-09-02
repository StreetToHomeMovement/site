Parse.Cloud.define('totalDonations', function(req, res) {
  // unmangle
  var token =  req.user.getSessionToken()
  var user = req.user
  var joined = user.attributes.joined
  console.log("user id is: " + user.id) //+ " and joined id is " + joined_id)
  console.log('joined_id: ' + joined.id)

  q = new Parse.Query("Donation")
	q.descending("amount")
  console.log('trying')
	q.find().then(function(donations) {
    var total = 0
    for (i = 0; i < donations.length; i++) {
      total += Number(donations[i].get('amount'))
    }
    console.log('total: ' + total)
    res.success(total)
  }, function(err) {
    console.error(err)
  })

})

Parse.Cloud.define('personalDonations', function(req, res) {
  // unmangle
  var token =  req.user.getSessionToken()
  var user = req.user
  var joined = user.attributes.joined
  console.log(user.attributes)
  console.log(joined.id)

  var jq = new Parse.Query("joined")
  jq.find('objectId', joined.id)

  var dq = new Parse.Query("Donation")
  dq.matchesQuery('joined', jq)

  // for now i return only the first donation, but eventually i should return
  // all of them
  dq.first().then(function(d) {
    console.log(d.attributes)
    res.success({
                  amount: d.attributes.amount,
                  createdAt: d.attributes.createdAt
                })
  })

})
