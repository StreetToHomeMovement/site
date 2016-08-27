Parse.Cloud.define('getTotalJoinCount', function(request, response) {

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
