Parse.initialize("sukeiran44ka88aj");
Parse.serverURL = 'https://parse-server-codecraft-x-ample.herokuapp.com/parse';

function logout() {
	console.log("Logout called");

	Parse.User.logOut().then(
		function success(user) {
			console.log("Logged Out ", Parse.User.current())
		},
		function error(err) {
			alert("Error: " + err.code + " " + err.message)
		}
	)
}
