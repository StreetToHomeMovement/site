var gateway = require('../helpers/braintree_gateway.js').gateway

Parse.Cloud.define('memberDonations', function(req, res) {

  Parse.Cloud.useMasterKey()

  q = new Parse.Query('User')
  // q.select(['firstname','totalDonations'])
  q.exists('totalDonations')
  q.find().then(function(users) {


  memberLevels = {
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





    console.log('HIHIH')
    for (i = 0; i < users.length; i++) {

      var user = users[i]
      var donorName = user.get('firstname')
      console.log(donorName)
      var memberLevel = "Diamond"

      console.log(memberLevel)

      memberLevels.Diamond.push({
        donorName: donorName || 'Anonymous',
        memberLevel: memberLevel
      })

      if (memberLevels.length === users.length) {
        console.log('done')
        res.success(memberLevels)
      }
    }
  })
})
