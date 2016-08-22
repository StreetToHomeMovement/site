var passwords = require('../passwords.json')
var braintree = require('braintree');

module.exports.gateway = braintree.connect({
  	environment:  braintree.Environment.Sandbox,
  	merchantId:   passwords.braintree.merchantId,
  	publicKey:    passwords.braintree.publicKey,
  	privateKey:   passwords.braintree.privateKey
})
