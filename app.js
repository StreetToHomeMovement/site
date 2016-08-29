var ParseServer = require('parse-server').ParseServer
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var indexController = require('./controllers/index.js')
var loginController = require('./controllers/login.js')
var payController = require('./controllers/pay.js')
var setaccountController = require('./controllers/setaccount.js')
var userController = require('./controllers/user.js')
var errorController = require('./controllers/error.js')

var api = new ParseServer({
	databaseURI: 'mongodb://heroku_2261fmlk:ml55j85auqbbu67m0clur0toc5@ds153835.mlab.com:53835/heroku_2261fmlk',
	cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
	serverURL: process.env.SERVER_URL || 'https://localhost:3000/parse',  // Don't forget to change to https if needed

	appId: process.env.APP_ID || 'sukeiran44ka88aj',
	masterKey: process.env.MASTER_KEY || '33jlas9893jkla', //Add your master key here. Keep it secret!

	//**** Email Verification ****//
	/* Enable email verification */
	// verifyUserEmails: true,
	/* The public URL of your app */
	// This will appear in the link that is used to verify email addresses and reset passwords.
	/* Set the mount path as it is in serverURL */
	publicServerURL: process.env.SERVER_URL || 'https://localhost:3000/parse',
	/* This will appear in the subject and body of the emails that are sent */
	appName: process.env.APP_NAME || "StreetToFightMovement",

	 emailAdapter: {
	 	module: 'parse-server-simple-mailgun-adapter',
	 	options: {
	 		fromAddress: process.env.EMAIL_FROM || "no-reply@getsidewalk.com",
	 		domain: process.env.MAILGUN_DOMAIN || "appe8b1d4d285fe49edafea07f3c1477cb3.mailgun.org",
			apiKey: process.env.MAILGUN_API_KEY  || "key-e0f292602a17f7ae7214409c83baba81"
		}
	},


});

var x = process.env.SERVER_URL || 'https://localhost:3000/parse'
console.log("server url: " + x)

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// use ejs view engine
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', express.static(__dirname + '/public'));

// set controllers (routes)
indexController(app)
loginController(app)
payController(app)
setaccountController(app)
userController(app)
errorController(app)

var port = process.env.PORT || 3000
var httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
	console.log('parse-server-example running on port ' + port + '.');
});
