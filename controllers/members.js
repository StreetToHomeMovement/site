module.exports = function(app) {

  app.get('/members', function(req, res) {
    Parse.Cloud.run("memberDonations").then(function(members) {
      res.render('members.ejs', {members: members})
    })
  })

}
