var gateway = require('../helpers/braintree_gateway.js').gateway

module.exports = function(app) {

  app.post("/webhooks/subscriptionCharged", function (req, res) {
    // https://developers.braintreepayments.com/reference/response/subscription/node
    gateway.webhookNotification.parse(
      req.body.bt_signature,
      req.body.bt_payload,
      function (err, webhookNotification) {
        console.log("[Webhook Received " + webhookNotification.timestamp + "] | Kind: " + webhookNotification.kind)
        if (webhookNotification.kind === "SubscriptionChargedSuccessfully") {
            var subscription = req.body.bt_payload
            var mostRecentTransaction = subscription.transactions[0]
            var amount = parseFloat(mostRecentTransaction.amount)
            var braintreeCustomerId = mostRecentTransaction.customer.id

            // find user in our db with matching braintreeCustomerId
            Parse.Cloud.useMasterKey()
            q = new Parse.Query("User")
            q.equalTo("braintreeCustomerId",braintreeCustomerId)
            q.first().then(function(user) {
              user.set("totalDonations", user.get("totalDonations" + amount))
              user.save().then(
            		function success(u) {
                  console.log('totalDonations updated for user ' + user.id)
                },
            		function error(err) {
                  console.error(err)
                }
              )
            }, function(err) {
              console.error(err)
            })




        }
      }
    )
    res.status(200).send()
  })

}
