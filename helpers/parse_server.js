var passwords = require('../passwords.json')
var Parse = require('parse/node')

Parse.initialize(passwords.parse_server.APP_ID);
Parse.serverURL = passwords.parse_server.SERVER_URL;

module.exports = Parse
