Parse.Cloud.define('linkJoinedWithUser', function(req, res) {

  Parse.Cloud.useMasterKey()

  // unmangle
  var token =  req.user.getSessionToken()
  var user = req.user
  var joined_id = req.params.joined_id
  console.log("sessionToken: " + token) //+ " and joined id is " + joined_id)
  console.log("user id is: " + user.id) //+ " and joined id is " + joined_id)
  console.log("joined_id is: " + joined_id)

  // get joined obj
  q = new Parse.Query("joined")
	q.equalTo("objectId", joined_id)
	q.first().then(function(joined) {
    console.log("found " + joined.id)

    // update user obj to reference joined obj
    user.set("joined", joined)
    // save to db

    console.log('attempting to save')
    user.save().then( function success(obj) {
        console.log("user updated joined with joined id: " + joined.id)
      }, function error(err) {
        console.error(err)
      })

  }, function(err) {
    console.error(err)
  })

})

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
