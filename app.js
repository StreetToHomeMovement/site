var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var Parse = require('parse/node')
var cookieParser = require('cookie-parser')

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

app.post('/pay', urlencodedParser, function(req, res) {
  // set cookies
  var dateIn30Days = new Date(Date.now() + 1000*60*60*24*30)
  res.cookie('email', req.body.email, { expires: dateIn30Days })
  res.cookie('zip', req.body.zip, { expires: dateIn30Days })

  // save to database
  var Joined = new Parse.Object.extend("joined")
  var joined = new Joined()

	joined.set("email",req.body.email)
	joined.set("zip",req.body.zip)

	joined.save().then( function success(obj) {
		  console.log("client joined with id " + obj.id)
      res.sendFile(__dirname + '/public/views/pay.html')
		}, function error(err) {
			console.error(err)
		})

})

// see this regarding users logging in without re-entering pwd:
// http://stackoverflow.com/questions/5009685/encoding-cookies-so-they-cannot-be-spoofed-or-read-etc/5009903#5009903
app.post('/checkout', function(req, res) {
  res.sendFile(__dirname + '/public/views/setpassword.html')
})

app.get('/user', function(req, res) {
  if (req.cookies.firstname) {
    res.render(__dirname + '/public/views/user.ejs', {
      fname: req.cookies.firstname,
      lname: req.cookies.lastname
    })
  }
  else {
    res.sendFile(__dirname + '/public/views/setpassword.html')
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

app.listen(port)
