module.exports = function(app) {

  app.get('*', function(req, res, next) {
    var err = new Error()
    err.status = 404
    next(err)
  })

  // handling 404 errors
  app.use(function(err, req, res, next) {
    if(err.status !== 404) {
      return next()
    }

    res.send(err.message || '** not a valid route **')
  })

}
