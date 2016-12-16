module.exports = function(app) {

  app.get('/donors', function(req, res) {



    var query = new Parse.Query('User')
    query.equalTo('email', req.cookies.email)
    query.find({ sessionToken: req.cookies.sessionToken || "-1" }) // pass the session token to find()
      .then(function(r) {
        console.log("workedHO")


        ///////////////////////////////////////////////////////////////////////


        var memberLevels = blankMemberLevels()
        var bookkeeping = []
        //res.render('members.ejs', {memberLevels: memberLevels})
        q = new Parse.Query('User')
        q.exists('totalDonations')

        q.find().then(function(users) {
          for (i = 0; i < users.length; i++) {
            var user = users[i]
            bookkeeping.push(i)
            var memberLevel = calculateMemberLevel(user.get('totalDonations'))
            memberLevels[memberLevel].push(user.get('donorDisplayName') || user.get('firstname'))

            if (bookkeeping.length === users.length) {
              res.render('donors.ejs', {
                memberLevels: memberLevels,
                APP_ID: app.get('APP_ID'),
                SERVER_URL: app.get('SERVER_URL')
              })
            }
          }
        })


        ///////////////////////////////////////////////////////////////////////



      })

    })
  }

function blankMemberLevels() {
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
    return memberLevels
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

//var cleanUri = location.protocol + '//' + location.host + location.pathname + location.hash;
// window.history.replaceState({}, document.title, cleanUri);
