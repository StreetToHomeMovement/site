var cron = require('node-cron')
var moment = require('moment')

cron.schedule('* * * * *', function(){ // change this to once a day see link below:
	// http://stackoverflow.com/questions/20499225/i-need-a-nodejs-scheduler-that-allows-for-tasks-at-different-intervals
  console.log('running reminderEmail cronjob')
  // moment.utc(moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"))).format("DD:HH")
  var now = moment(new Date()).format("YYYY-MM-DD'T'HH:mm:ss:SSSZ")

  q = new Parse.Query('User')
  q.equalTo('tempAccount',true)
  q.equalTo('reminderEmail',false)
  q.find({
    success: function(users) {
      // results is an array of Parse.Object.
      for (i = 0; i < users.length; i++) {
        var user = users[i]
        var email = user.get('email')
        console.log('email: ' + email)
        var tempPassword = user.get('tempPassword')
        var createdAt = user.get('createdAt')
        var createdAtMoment = moment(createdAt, "YYYY-MM-DD'T'HH:mm:ss:SSSZ")
        var difference = moment(now).diff(createdAt, 'days');
        if (email === 'darren@getsidewalk.com') { // change this to difference >= 5
          var link = 'http://localhost:3000/setaccount/' + encodeURIComponent(email) + '/' + tempPassword
          var Mailgun = require('mailgun').Mailgun;

          var mg = new Mailgun('key-e0f292602a17f7ae7214409c83baba81');
          mg.sendText('support@StreetToFightMovement.com', [`<${email}>`],
            'Finish making your account',
            'Click the following link to finish your account: ' + link,
            'noreply@example.com', {},
            function(err) {
              if (err) {
                console.log('Oh noes: ' + err)
              } else {
                console.log('reminder email sent')
                Parse.Cloud.useMasterKey()
                user.set('reminderEmail',true)
                user.save({ useMasterKey: true }).then( function success(obj) {
                    console.log('reminderEmail boolean set to true ' + obj.id)
                  }, function error(err) {
                    console.error(err)
                  }
                )

              }
          })
        }
      }
    },

    error: function(error) {
      // error is an instance of Parse.Error.
      console.error(error)
    }
  })
})
