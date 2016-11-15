module.exports = function(app) {

  app.get('/donationAmount', function (req, res) {
    res.render('donationAmount.ejs')
  })

}
