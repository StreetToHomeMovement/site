var gateway = require('../helpers/braintree_gateway.js').gateway
var Parse = require('../helpers/parse_server')

module.exports = function(app) {

  app.get('/pay', function (req, res) {

  	// generate braintree client token and render html
  	gateway.clientToken.generate({}, function (err, res2) {
  	  res.render('pay.ejs', { clientToken: res2.clientToken })
  	})

  })

}
