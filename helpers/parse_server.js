if (process.env.APP_ID) {
	console.log("using environmental vars for parse_server")
} else {
	console.log("running locally")
	var passwords = require('../passwords.json')
	console.log('READ IN PASSWORDS FOR PARSE_SERVER')
}

var Parse = require('parse/node')

Parse.initialize(process.env.APP_ID || passwords.parse_server.APP_ID);
Parse.serverURL = process.env.SERVER_URL || passwords.parse_server.SERVER_URL;

module.exports = Parse
