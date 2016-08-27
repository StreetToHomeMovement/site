var joins = require('../models/joins.js')
var gateway = require('../helpers/braintree_gateway.js').gateway

module.exports = function(app) {

  app.post('/pay', function (req, res) {
  	// unmangle form post
  	var email = req.body.email
  	var zip = req.body.zip

    // set cookies
    var dateIn1Hour = new Date(Date.now() + 1000*60*60*1)
    res.cookie('email', email, { expires: dateIn1Hour })
    res.cookie('zip', zip, { expires: dateIn1Hour })

  	// save to db
  	joins.create(email, zip)

  	// generate braintree client token and render html
  	gateway.clientToken.generate({}, function (err, res2) {
  	  res.render('pay.ejs', {
  	    clientToken: res2.clientToken
  	  })

  	})
  })

}
