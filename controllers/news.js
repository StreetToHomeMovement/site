module.exports = function(app) {

  app.get('/news', function (req, res) {
    res.redirect('http://45.55.232.156/')
  })

}
