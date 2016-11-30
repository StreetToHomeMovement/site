module.exports = function(app) {

  app.get('/donationAmount', function (req, res) {
    res.render('donationAmount.ejs', {
      APP_ID: app.get('APP_ID'),
      SERVER_URL: app.get('SERVER_URL')
    })
  })

}
