var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var cookieParser = require('cookie-parser')
var joins = require('./models/joins.js')
var donations = require('./models/donations.js')
var users = require('./models/users.js')
var braintree = require('braintree');
var passwords = require('./passwords.json')
var gateway = braintree.connect({
	environment:  braintree.Environment.Sandbox,
	merchantId:   passwords.braintree.merchantId,
	publicKey:    passwords.braintree.publicKey,
	privateKey:   passwords.braintree.privateKey
});


// Serve static assets from the /public folder
app.use(cookieParser())
app.use('/public', express.static(__dirname + '/public'));

// use ejs view engine
app.set('view engine', 'ejs')


app.get('/', function(req, res) {
  res.render(__dirname + '/public/views/index.ejs', {firstname: req.cookies.firstname})
})


app.post('/pay', urlencodedParser, function (req, res) {
	// unmangle form post
	var email = req.body.email
	var zip = req.body.zip

  // set cookies
  var dateIn30Days = new Date(Date.now() + 1000*60*60*24*30)
  res.cookie('email', email, { expires: dateIn30Days })
  res.cookie('zip', zip, { expires: dateIn30Days })

	// save to db
	joins.create(email, zip)

	// generate braintree client token and render html
	gateway.clientToken.generate({}, function (err, res2) {
	  res.render(__dirname + '/public/views/pay.ejs', {
	    clientToken: res2.clientToken
	  });

	});

});

// see this regarding users logging in without re-entering pwd:
// http://stackoverflow.com/questions/5009685/encoding-cookies-so-they-cannot-be-spoofed-or-read-etc/5009903#5009903
app.post('/setaccount', urlencodedParser, function(req, res) {
	var payment_method_nonce = req.body.payment_method_nonce
	var amount = req.body.amount

	donations.create(payment_method_nonce, amount)
	res.sendFile(__dirname + '/public/views/setaccount.html')
})



app.get('/user', function(req, res) {
  if (req.cookies.firstname) {
    res.render(__dirname + '/public/views/user.ejs', {
      fname: req.cookies.firstname,
      lname: req.cookies.lastname
    })
  }
  else {
    res.sendFile(__dirname + '/public/views/setaccount.html')
  }
})



app.post('/user', urlencodedParser, function(req, res) {
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
	res.render(__dirname + '/public/views/user.ejs', {
		fname: req.body.firstname,
		lname: req.body.lastname
	})

})

app.get('/login', function(req, res) {
  res.sendFile(__dirname + '/public/views/login.html')
})

app.get('/resetpwd', function(req, res) {
  res.sendFile(__dirname + '/public/views/resetpwd.html')
})

app.listen(port)
