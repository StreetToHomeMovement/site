module.exports = function(app) {

  app.post('/webhook', function(req, res) {
    // see https://developers.braintreepayments.com/reference/general/webhooks/disbursement/node
    console.log('in total /webhook')
    console.log(req)
  })

}
