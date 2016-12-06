var passwords = require('../passwords.json')
var Parse = require('parse/node')

Parse.initialize(process.env.APP_ID || passwords.parse_server.APP_ID);
Parse.serverURL = process.env.SERVER_URL || passwords.parse_server.SERVER_URL;

module.exports = Parse
