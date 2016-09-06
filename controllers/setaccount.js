var path = require('path')
var Parse = require('../helpers/parse_server')
// try to refactor by chaining "then" twice

module.exports = function(app) {

  app.post('/setaccount', function(req, res) {
    // save transcation to braintree db
    var gateway = require('../helpers/braintree_gateway.js').gateway
    gateway.transaction.sale({
      amount: req.body.amount,
      paymentMethodNonce: req.body.payment_method_nonce,
      customer: {
        email: req.cookies.email
      },
      options: {
        storeInVaultOnSuccess: true
      }
    }, function (err, result) {
      console.log(err)
      console.log(result)
    });

  	res.sendFile(path.join(__dirname, '..', '/views/setaccount.html'))
  })

}
