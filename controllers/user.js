var Parse = require('../helpers/parse_server')
var path = require('path')

module.exports = function(app) {

  app.get('/user', function(req, res) {

    Parse.Cloud.run("test").then(function(response) {
      console.log(response)
    })

    console.log("line 12")


    var token = req.cookies.sessionToken
    var email = req.cookies.email
    var password = req.cookies.password

    console.log('sessiontoken: ' + token)
    console.log('cookies: ' + req.cookies)

    res.sendFile(path.join(__dirname, '..', '/views/login.html'))

  })

  app.post('/user', function(req, res) {
    // unmangle form post
    var fname = req.body.firstname
    var lname = req.body.lastname
    var password = req.body.password

    // set cookies with 30 day expiration date
    var dateIn30Days = new Date(Date.now() + 1000*60*60*24*30)
    res.cookie('firstname', fname, { expires: dateIn30Days })
    res.cookie('lastname', lname, { expires: dateIn30Days })
    res.cookie('password', password, { expires: dateIn30Days })

    // get previously set cookies
    var zip = req.cookies.zip
    var email = req.cookies.email

    // save to database user
  	users.create(email, password, fname, lname, zip)

  	// render html
  	res.render('user.ejs', {
  		fname: req.body.firstname,
  		lname: req.body.lastname
  	})

  })

}
