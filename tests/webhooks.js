var gateway = require('../helpers/braintree_gateway.js').gateway

sampleNotification = gateway.webhookTesting.sampleNotification(
  braintree.WebhookNotification.Kind.Disbursement,
  "myId"
)
gateway.webhookNotification.parse(
  sampleNotification.bt_signature,
  sampleNotification.bt_payload,
  function (err, webhookNotification) {
    var id = webhookNotification.subscription.id
    console.log(id)
  }
)
