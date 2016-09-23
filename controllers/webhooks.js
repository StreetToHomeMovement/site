module.exports = function(app) {

  app.post("/webhooks/disbursement", function (req, res) {
    gateway.webhookNotification.parse(
      req.body.bt_signature,
      req.body.bt_payload,
      function (err, webhookNotification) {
        console.log("[Webhook Received " + webhookNotification.timestamp + "] | Kind: " + webhookNotification.kind);
      }
    );
    res.status(200).send();
  });


}
