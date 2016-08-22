var donations = require('../models/donations.js')
var path = require('path')

module.exports = function(app) {

  // see this regarding users logging in without re-entering pwd:
  // http://stackoverflow.com/questions/5009685/encoding-cookies-so-they-cannot-be-spoofed-or-read-etc/5009903#5009903
  app.post('/setaccount', function(req, res) {
  	var payment_method_nonce = req.body.payment_method_nonce
  	var amount = req.body.amount

  	donations.create(payment_method_nonce, amount)
  	res.sendFile(path.join(__dirname, '..', '/views/setaccount.html'))
  })

}
