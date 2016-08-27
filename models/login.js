var Parse = require('../helpers/parse_server')

exports.create = function(username, password) {
  Parse.User.login(username, password).then(
		function success(user) {
			console.log("Logged in ", user);
		},
		function error(err) {
			alert("Error: " + err.code + " " + err.message);
		}
	)
}
