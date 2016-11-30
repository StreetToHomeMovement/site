module.exports = function(app) {

  app.get('/setaccount', function(req,res) {
    res.render('setaccount.ejs', {
      tempLogin: false,
      email: null,
      tempPassword: null,
      APP_ID: app.get('APP_ID'),
      SERVER_URL: app.get('SERVER_URL')
    })
  })

  app.get('/setaccount/:email/:tempPassword', function(req,res) {
    res.render('setaccount.ejs', {
      tempLogin: true,
      email: req.params.email,
      tempPassword: req.params.tempPassword,
      APP_ID: app.get('APP_ID'),
      SERVER_URL: app.get('SERVER_URL')
    })
  })

}
