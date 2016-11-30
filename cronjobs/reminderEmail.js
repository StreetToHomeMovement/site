var cron = require('node-cron')
var moment = require('moment')

cron.schedule('00 30 11 * * 1-5', function(){ // - Runs every weekday (Monday through Friday) at 11:30:00 AM. It does not run on Saturday or Sunday.
	console.log('running reminderEmail cronjob')
  var now = moment(new Date()).format("YYYY-MM-DD'T'HH:mm:ss:SSSZ")

  q = new Parse.Query('User')
  q.equalTo('tempAccount',true)
  q.equalTo('reminderEmail',false)
  q.find({
    success: function(users) {
      // users is an array of Parse.Object
      for (i = 0; i < users.length; i++) {
        var user = users[i]
        var email = user.get('email')
        console.log('email: ' + email)
        var createdAt = user.get('createdAt')
        var createdAtMoment = moment(createdAt, "YYYY-MM-DD'T'HH:mm:ss:SSSZ")
        var difference = moment(now).diff(createdAt, 'days');
        if (difference >= 5) {
					// link needs to be changed to have production URL not just development URL
          var link = 'http://localhost:3000/setaccount/' + encodeURIComponent(email) + '/' + tempPassword
          var Mailgun = require('mailgun').Mailgun;

          var mg = new Mailgun('key-e0f292602a17f7ae7214409c83baba81');
          mg.sendText('support@StreetToHomeMovement.org', [`<${email}>`],
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
