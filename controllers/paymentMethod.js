var gateway = require('../helpers/braintree_gateway.js').gateway

module.exports = function(app) {

  app.get('/paymentMethod', function (req, res) {

  	// generate braintree client token and render html
  	gateway.clientToken.generate({}, function (err, res2) {
  	  res.render('paymentMethod.ejs', { clientToken: res2.clientToken })
  	})

  })

}
