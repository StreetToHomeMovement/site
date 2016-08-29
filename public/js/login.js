Parse.initialize("sukeiran44ka88aj");
Parse.serverURL = 'https://localhost:3000/parse';

function login() {
	console.log("Login called");

	// unmangle form data
	var email = document.getElementById("email").value
	var password = document.getElementById("password").value

	Parse.User.logIn(email, password).then(
		function success(user) {
			console.log("Logged in ", Parse.User.current())
			window.location.href = '/user'
		},
		function error(err) {
			alert("Error: " + err.code + " " + err.message)
		}
	)
}
