module.exports = function(app) {

  app.get('/members', function(req, res) {

    var memberLevels = {
            'Diamond': [],
          	'Ruby': [],
           	'Jade': [],
          	'Sapphire': [],
          	'Emerald': [],
          	'Opal': [],
          	'Pearl': [],
          	'Garnet': [],
          	'Amethyst': [],
          	'Quartz': [],
          	'Zircon': []
      }

    q = new Parse.Query('User')
    q.exists('totalDonations')

    q.find().then(function(users) {
      for (i = 0; i < users.length; i++) {
        var user = users[i]
        var memberLevel = calculateMemberLevel(user.get('totalDonations'))
        memberLevels[memberLevel].push(user.get('donorname') || user.get('firstname'))

        if (i+1 === users.length) {
          console.log(memberLevels)
          res.render('members.ejs', {memberLevels: memberLevels})
        }

      }
    })

  })
}

function calculateMemberLevel(totalDonations) {
  var d = totalDonations

  if (d >= 1000000) {
    return 'Diamond'
  } else if (d >= 500000) {
    return 'Ruby'
  } else if (d >= 250000) {
    return 'Jade'
  } else if (d >= 100000) {
    return 'Sapphire'
  } else if (d >= 25000) {
    return 'Emerald'
  } else if (d >= 10000) {
    return 'Opal'
  } else if (d >= 5000) {
    return 'Pearl'
  } else if (d >= 2500) {
    return 'Garnet'
  } else if (d >= 1000) {
    return 'Amethyst'
  } else if (d >= 500) {
    return 'Quartz'
  } else {
    return 'Zircon'
  }

}

// var memberLevels = require('../test_data/memberLevels.js')
//
// module.exports = function(app) {
//
//   app.get('/members', function(req, res) {
//     console.log(memberLevels)
//     console.log(memberLevels.length)
//     console.log()
//     res.render('members.ejs', {memberLevels: memberLevels})
//   })
//
// }
