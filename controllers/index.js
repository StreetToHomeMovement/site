module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index.ejs', {
      APP_ID: app.get('APP_ID'),
      SERVER_URL: app.get('SERVER_URL')
    })
  })

}
