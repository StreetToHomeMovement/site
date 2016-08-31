// Parse.Cloud.define('getTotalJoinCount', function(request, response) {
//
//   var token =  request.user.getSessionToken()
//   var email = request.user.attributes.email
//   var id = request.user.id
//   console.log("in get total count function")
//   console.log("token is: " + token)
//
//   var query = new Parse.Query('joined')
//   query.equalTo("email", request.user.attributes.email)
//   query.count({ sessionToken: token }).then(function(count) {
//       response.success(count+23)
//     }, function(error) {
//       response.error("didnt work")
//     })
// })

Parse.Cloud.define('getGoodies', function(request, response) {

  var token =  request.user.getSessionToken()
  var email = request.user.attributes.email
  var id = request.user.id
  console.log("in get total count function")
  console.log("token is: " + token)

  var query = new Parse.Query('joined')
  query.equalTo("email", request.user.attributes.email)
  query.count({ sessionToken: token }).then(function(count) {
      response.success(count)
    }, function(error) {
      response.error("didnt work")
    })
})

Parse.Cloud.define('getDonations', function(req, res) {

  var token =  req.user.getSessionToken()
  var email = req.user.attributes.email

  console.log("in getDonations function")
  console.log("token is: " + token)

  var query = new Parse.Query('joined')
  query.equalTo("email", req.user.attributes.email)
  query.count({ sessionToken: token }).then(function(count) {
      response.success("joined " + count + " times")
    }, function(error) {
      response.error("didnt work")
    })
})
