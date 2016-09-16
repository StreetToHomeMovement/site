var path = require('path')

module.exports = function(app) {

  app.get('/setaccount', function(req,res) {
    res.sendFile(path.join(__dirname, '..', '/views/setaccount.html'))
  })

  app.get('/setaccount/:email/:tempPassword', function(req,res) {
    var email = req.params.email
    var tempPassword = req.params.tempPassword
    res.render('finishaccount.ejs', {
      email: email,
      tempPassword: tempPassword
    })

  })

}
