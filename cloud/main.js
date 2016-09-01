Parse.Cloud.define('linkJoinedWithUser', function(req, res) {
  Parse.Cloud.useMasterKey()

  // unmangle
  var token =  req.user.getSessionToken()
  var user = req.user
  var joined_id = req.params.joined_id
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
