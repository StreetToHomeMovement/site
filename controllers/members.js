var memberLevels = require('../test_data/memberLevels.js')

module.exports = function(app) {

  app.get('/members', function(req, res) {
    console.log(memberLevels)
    console.log(memberLevels.length)
    console.log()
    res.render('members.ejs', {memberLevels: memberLevels})
  })

}
