var ParseServer = require('parse-server').ParseServer
var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var indexController = require('./controllers/index.js')
var loginController = require('./controllers/login.js')
var payController = require('./controllers/pay.js')
var resetpwdController = require('./controllers/resetpwd.js')
var setaccountController = require('./controllers/setaccount.js')
var userController = require('./controllers/user.js')
var errorController = require('./controllers/error.js')

var api = new ParseServer({
	databaseURI: 'mongodb://heroku_2261fmlk:ml55j85auqbbu67m0clur0toc5@ds153835.mlab.com:53835/heroku_2261fmlk',
	cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
	serverURL: process.env.SERVER_URL || 'http://localhost:3000/parse',  // Don't forget to change to https if needed

	appId: process.env.APP_ID || 'sukeiran44ka88aj',
	masterKey: process.env.MASTER_KEY || '33jlas9893jkla', //Add your master key here. Keep it secret!
});

var x = process.env.SERVER_URL || 'http://localhost:3000/parse'
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
resetpwdController(app)
setaccountController(app)
userController(app)
errorController(app)

app.listen(port)
