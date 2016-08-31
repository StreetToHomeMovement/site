var path = require('path')
var Parse = require('../helpers/parse_server')

module.exports = function(app) {

  app.post('/setaccount', function(req, res) {
    // retrieve the donor
    var donor = 'test'
    var q = new Parse.Query("joined")
    q.equalTo("objectId", req.cookies.joined_id)
    q.first().then(function(donor) {
    	console.log("found " + donor.id)
      // save to db
      var Donation = new Parse.Object.extend("Donation")
      var donation = new Donation()

      donation.set("payment_method_nonce", req.body.payment_method_nonce)
      donation.set("amount", req.body.amount)
      donation.set("donor", donor)

      donation.save().then( function success(obj) {
          console.log("donation made with id " + obj.id)
        }, function error(err) {
          console.error(err)
        })
    }, function(err) {
      console.log(err)
    });

  	res.sendFile(path.join(__dirname, '..', '/views/setaccount.html'))
  })

}
