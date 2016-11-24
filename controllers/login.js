module.exports = function(app) {

  app.get('/signin', function(req, res) {
    res.render('login.ejs')
  })

}
