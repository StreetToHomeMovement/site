if (process.env.APP_ID) {
	console.log("using environmental vars for braintree")
} else {
	console.log("running locally")
	var passwords = require('../passwords.json')
	console.log('READ IN PASSWORDS FOR BRAINTREE')
}

var braintree = require('braintree');

module.exports.gateway = braintree.connect({
  	environment:  braintree.Environment.Sandbox,
  	merchantId:   process.env.btMerchantId || passwords.braintree.btMerchantId,
  	publicKey:    process.env.btPublicKey || passwords.braintree.btPublicKey,
  	privateKey:   process.env.btPrivateKey || passwords.braintree.btPrivateKey
})
