Parse.initialize("sukeiran44ka88aj");
Parse.serverURL = 'http://localhost:3000/parse';

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
