console.log('RUNNING')

var ParseServer = require('parse-server').ParseServer
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

// run cronjob
require ('./cronjobs/reminderEmail.js')

if (process.env.APP_ID) {
	console.log("running on hosted platform")
} else {
	console.log("running locally")
	var passwords = require('./passwords.json')
	console.log('READ IN PASSWORDS')
}

app.set('APP_ID',process.env.APP_ID || passwords.parse_server.APP_ID)
app.set('SERVER_URL',process.env.SERVER_URL || passwords.parse_server.SERVER_URL)

var api = new ParseServer({
	databaseURI: process.env.MONGODB_URI || passwords.parse_server.MONGODB_URI,
	cloud: __dirname + '/cloud/main.js',
	serverURL: process.env.SERVER_URL || passwords.parse_server.SERVER_URL,
	appId: process.env.APP_ID || passwords.parse_server.APP_ID,
	masterKey: process.env.MASTER_KEY || passwords.parse_server.MASTER_KEY, //Add your master key here. Keep it secret!

	//**** Email Verification ****//
	/* Enable email verification */
	// verifyUserEmails: true,
	/* The public URL of your app */
	// This will appear in the link that is used to verify email addresses and reset passwords.
	/* Set the mount path as it is in serverURL */
	publicServerURL: process.env.SERVER_URL || passwords.parse_server.SERVER_URL, // or 'http://localhost:3000/'
	/* This will appear in the subject and body of the emails that are sent */
	appName: process.env.APP_NAME || "StreetToHomeMovement",

	 emailAdapter: {
	 	module: 'parse-server-simple-mailgun-adapter',
	 	options: {
	 		fromAddress: process.env.EMAIL_FROM || passwords.mailgun.EMAIL_FROM,
	 		domain: process.env.MAILGUN_DOMAIN || passwords.mailgun.MAILGUN_DOMAIN,
			apiKey: process.env.MAILGUN_API_KEY  || passwords.mailgun.MAILGUN_API_KEY
		}
	},

});

var cloud = process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js'

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
console.log('mountPath: ' + mountPath)
app.use(mountPath, api);

// use ejs view engine
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', express.static(__dirname + '/public'));

// set controllers (routes)
var indexController = require('./controllers/index.js')
var loginController = require('./controllers/login.js')
var donationAmountController = require('./controllers/donationAmount.js')
var paymentMethodController = require('./controllers/paymentMethod.js')
var setaccountController = require('./controllers/setaccount.js')
var newsController = require('./controllers/news.js')
var donorsController = require('./controllers/donors.js')
var webhooksController = require('./controllers/webhooks.js')
var errorController = require('./controllers/error.js')

indexController(app)
loginController(app)
donationAmountController(app)
paymentMethodController(app)
setaccountController(app)
newsController(app)
donorsController(app)
webhooksController(app)
errorController(app)

var port = process.env.PORT || 3000
console.log('port: ' + port)
var httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
	console.log('parse-server-example running on port ' + port + '.');
})
