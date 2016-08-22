var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "pqqtf2fjcr2rkv7r",
  publicKey: "hbq2t95s9vtsxt7t",
  privateKey: "c4eccbba9d7b6cd524d0f979f9543bcf"
});

app.get("/client_token", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
});
