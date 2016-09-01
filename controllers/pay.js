var gateway = require('../helpers/braintree_gateway.js').gateway
var Parse = require('../helpers/parse_server')

module.exports = function(app) {

  app.post('/pay', function (req, res) {
  	// unmangle form post
  	var email = req.body.email
  	var zip = req.body.zip

    // set as cookies
    var dateIn4Weeks = new Date(Date.now() + 1000*60*60*24*7*4)
    res.cookie('email', email, { expires: dateIn4Weeks })
    res.cookie('zip', zip, { expires: dateIn4Weeks })

  	// save to db
    var Joined = new Parse.Object.extend("joined")
    var joined = new Joined()

    joined.set("email", email)
    joined.set("zip", zip)

    joined.save().then( function success(obj) {
        console.log("client joined with id " + obj.id)
        // set cookie
        var dateIn1Week = new Date(Date.now() + 1000*60*60*24*7)
        res.cookie('joined_id', obj.id, { expires: dateIn1Week })
      }, function error(err) {
        console.error(err)
      })

  	// generate braintree client token and render html
  	gateway.clientToken.generate({}, function (err, res2) {
  	  res.render('pay.ejs', {
  	    clientToken: res2.clientToken
  	  })

  	})
  })

}
