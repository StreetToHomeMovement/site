var Parse = require('../helpers/parse_server')

exports.create = function(payment_method_nonce, amount) {
  var Donation = new Parse.Object.extend("Donation")
  var donation = new Donation()

  donation.set("payment_method_nonce", payment_method_nonce)
  donation.set("amount", amount)

  donation.save().then( function success(obj) {
      console.log("donation made with id " + obj.id)
    }, function error(err) {
      console.error(err)
    })

}
