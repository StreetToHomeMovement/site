module.exports = function(app) {

  app.get('/join', function(req, res) {
    res.render('join.ejs', {
      APP_ID: app.get('APP_ID'),
      SERVER_URL: app.get('SERVER_URL')
    })
  })

}
