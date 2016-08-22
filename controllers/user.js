var users = require('../models/users.js')

module.exports = function(app) {

  app.get('/user', function(req, res) {
    if (req.cookies.firstname) {
      res.render('user.ejs', {
        fname: req.cookies.firstname,
        lname: req.cookies.lastname
      })
    }
    else {
      res.sendFile('setaccount.html')
    }
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
