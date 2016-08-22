var path = require('path')

module.exports = function(app) {

  app.get('/resetpwd', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '/views/resetpwd.html'))
  })

}
