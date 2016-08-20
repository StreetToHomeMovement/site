var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var Parse = require('parse/node')
var cookieParser = require('cookie-parser')
var braintree = require('braintree');
var passwords = require('./passwords.json')
var gateway = braintree.connect({
	environment:  braintree.Environment.Sandbox,
	merchantId:   passwords.braintree.merchantId,
	publicKey:    passwords.braintree.publicKey,
	privateKey:   passwords.braintree.privateKey
});

Parse.initialize("sukeiran44ka88aj");
Parse.serverURL = 'https://parse-server-codecraft-x-ample.herokuapp.com/parse';

// Serve static assets from the /public folder
app.use(cookieParser())
app.use('/public', express.static(__dirname + '/public'));

// use ejs view engine
app.set('view engine', 'ejs')


app.get('/', function(req, res) {
  res.render(__dirname + '/public/views/index.ejs', {firstname: req.cookies.firstname})
})


app.post('/pay', urlencodedParser, function (request, response) {

  // set cookies
  var dateIn30Days = new Date(Date.now() + 1000*60*60*24*30)
  response.cookie('email', request.body.email, { expires: dateIn30Days })
  response.cookie('zip', request.body.zip, { expires: dateIn30Days })

  // save to database
  var Joined = new Parse.Object.extend("joined")
  var joined = new Joined()

	joined.set("email",request.body.email)
	joined.set("zip",request.body.zip)

	joined.save().then( function success(obj) {
		  console.log("client joined with id " + obj.id)
      gateway.clientToken.generate({}, function (err, res) {
        response.render(__dirname + '/public/views/pay.ejs', {
          clientToken: res.clientToken
        });
      });
		}, function error(err) {
			console.error(err)
		})



});

// see this regarding users logging in without re-entering pwd:
// http://stackoverflow.com/questions/5009685/encoding-cookies-so-they-cannot-be-spoofed-or-read-etc/5009903#5009903
app.post('/setaccount', urlencodedParser, function(req, res) {
  // save to database
  var Donation = new Parse.Object.extend("Donation")
  var donation = new Donation()

	donation.set("payment_method_nonce",req.body.payment_method_nonce)
	donation.set("amount",req.body.amount)
  //donation.set("")

	donation.save().then( function success(obj) {
		  console.log("donation made with id " + obj.id)
      res.sendFile(__dirname + '/public/views/setaccount.html')
		}, function error(err) {
			console.error(err)
		})
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
  var firstname = req.body.firstname
  var lastname = req.body.lastname
  var password = req.body.password

  // set cookies
  var dateIn30Days = new Date(Date.now() + 1000*60*60*24*30)
  res.cookie('firstname', firstname, { expires: dateIn30Days })
  res.cookie('lastname', lastname, { expires: dateIn30Days })
  res.cookie('password', password, { expires: dateIn30Days })

  // get previously set cookies
  var zip = req.cookies.zip
  var email = req.cookies.email

  // save to database
  var user = new Parse.User()

	user.set("username",email)
  user.set("email",email)
  user.set("password",password)

  user.set("firstname",firstname)
  user.set("lastname",lastname)
  user.set("zip",zip)

	user.signUp().then( function success(obj) {
		  console.log("client signed up with id " + obj.id)
      res.render(__dirname + '/public/views/user.ejs', {
        fname: req.body.firstname,
        lname: req.body.lastname
      })
		}, function error(err) {
			console.error(err)
		})

})

app.get('/login', function(req, res) {
  res.sendFile(__dirname + '/public/views/login.html')
})

app.get('/resetpwd', function(req, res) {
  res.sendFile(__dirname + '/public/views/resetpwd.html')
})

app.listen(port)
