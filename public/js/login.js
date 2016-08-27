Parse.initialize("sukeiran44ka88aj");
Parse.serverURL = 'http://localhost:3000/parse';

function login() {
	console.log("Login called");

	// unmangle form data
	var email = document.getElementById("email").value
	var password = document.getElementById("password").value

	Parse.User.logIn(email, password).then(
		function success(user) {
			console.log("Logged in ", Parse.User.current())
			document.cookie = "sessionToken" + "=" + Parse.User.current().attributes.sessionToken + "; "
			document.cookie = "firstname" + "=" + Parse.User.current().attributes.firstname + "; "
		},
		function error(err) {
			alert("Error: " + err.code + " " + err.message)
		}
	)
}
