var Parse = require('../helpers/parse_server')

exports.create = function(email, password, fname, lname, zip) {
  var user = new Parse.User()

  user.set("username",email)
  user.set("email",email)
  user.set("password",password)

  user.set("firstname",fname)
  user.set("lastname",lname)
  user.set("zip",zip)

  user.signUp().then( function success(obj) {
      console.log("client signed up with id " + obj.id)
    }, function error(err) {
      console.error(err)
    })

}
