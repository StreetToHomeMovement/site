var passwordGenerator = require('generate-password')

Parse.Cloud.define('makeTemporaryPassword', function(req, res) {
  // generate unique random password
  var password = passwordGenerator.generate({
    length:15,
    numbers: true
  })
  res.success(password)
})
