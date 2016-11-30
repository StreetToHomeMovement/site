module.exports = function(app) {

  app.get('/signin', function(req, res) {
    res.render('login.ejs', {
      APP_ID: app.get('APP_ID'),
      SERVER_URL: app.get('SERVER_URL')
    })
  })

}
