module.exports = function(app) {

  app.get('/setaccount', function(req,res) {
    res.render('setaccount.ejs', {
      tempLogin: false,
      email: null,
      tempPassword: null
    })
  })

  app.get('/setaccount/:email/:tempPassword', function(req,res) {
    res.render('setaccount.ejs', {
      tempLogin: true,
      email: req.params.email,
      tempPassword: req.params.tempPassword
    })
  })

}
