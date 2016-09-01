var Parse = require('../helpers/parse_server')

exports.create = function(email, zip) {
  var Joined = new Parse.Object.extend("joined")
  var joined = new Joined()

  joined.set("email", email)
  joined.set("zip", zip)

  joined.save().then( function success(obj) {
      console.log("client joined with id " + obj.id)
      join_id = obj.id
      return join_id.saveAsync()
    }, function error(err) {
      console.error(err)
    }).then( function success(a) {
      console.log('line 18: ' + a)

    })

}
