var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var Parse = require('parse/node')

Parse.initialize("sukeiran44ka88aj");
Parse.serverURL = 'https://parse-server-codecraft-x-ample.herokuapp.com/parse';

// Serve static assets from the /public folder
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html')
})

app.post('/pay', urlencodedParser, function(req, res) {
  var Joined = new Parse.Object.extend("joined");
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

app.post('/checkout', function(req, res) {
  res.sendFile(__dirname + '/public/views/setpassword.html')
})

app.post('/user', function(req, res) {
  res.sendFile(__dirname + '/public/views/user.html')
})


app.listen(port)
