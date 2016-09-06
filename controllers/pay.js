var gateway = require('../helpers/braintree_gateway.js').gateway
var Parse = require('../helpers/parse_server')

module.exports = function(app) {

  app.post('/pay', function (req, res) {
  	// unmangle form post
  	var email = req.body.email
  	var zip = req.body.zip

    // set as cookies
    var dateIn100days = new Date(Date.now() + 1000*60*60*24*100)
    res.cookie('email', email, { expires: dateIn100days })
    res.cookie('zip', zip, { expires: dateIn100days })

  	// save to db
    var Joined = new Parse.Object.extend("joined")
    var joined = new Joined()

    joined.set("email", req.body.email)
    joined.set("zip", req.body.zip)

    joined.save().then( function success(obj) {
        console.log("client joined with id " + obj.id)
      }, function error(err) {
        console.error(err)
      })

  	// generate braintree client token and render html
  	gateway.clientToken.generate({}, function (err, res2) {
  	  res.render('pay.ejs', { clientToken: res2.clientToken })
  	})

  })

}
