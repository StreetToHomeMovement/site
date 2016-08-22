
module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index.ejs', {firstname: req.cookies.firstname})
  })

}
