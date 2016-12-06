var passwords = require('../passwords.json')
var braintree = require('braintree');

module.exports.gateway = braintree.connect({
  	environment:  braintree.Environment.Sandbox,
  	merchantId:   process.env.btMerchantId || passwords.braintree.btMerchantId,
  	publicKey:    process.env.btPublicKey || passwords.braintree.btPublicKey,
  	privateKey:   process.env.btPrivateKey || passwords.braintree.btPrivateKey
})
