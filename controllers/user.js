module.exports = function(app) {

  app.get('/user', function(req, res) {
    Parse.Cloud.run("memberDonations").then(function(members) {
      res.render('user.ejs', {members: members})
    })
  })

}
