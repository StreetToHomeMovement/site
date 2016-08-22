var Parse = require('parse/node')
Parse.initialize("sukeiran44ka88aj");
Parse.serverURL = 'https://parse-server-codecraft-x-ample.herokuapp.com/parse';

exports.create = function(email, zip) {
  var Joined = new Parse.Object.extend("joined")
  var joined = new Joined()

  joined.set("email", email)
  joined.set("zip", zip)

  joined.save().then( function success(obj) {
      console.log("client joined with id " + obj.id)
    }, function error(err) {
      console.error(err)
    })
}


/*
gateway.clientToken.generate({}, function (err, res) {
  console.log("braintree")
  response.render(__dirname + '../views/pay.ejs', {
    clientToken: res.clientToken
  });

});
*/
