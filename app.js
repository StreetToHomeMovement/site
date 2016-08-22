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

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', express.static(__dirname + '/public'));

// use ejs view engine
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');

// set controllers (routes)
indexController(app)
loginController(app)
payController(app)
resetpwdController(app)
setaccountController(app)
userController(app)

app.listen(port)
