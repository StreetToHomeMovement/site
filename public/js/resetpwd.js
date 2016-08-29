Parse.initialize("sukeiran44ka88aj");
Parse.serverURL = 'https://parse-server-codecraft-x-ample.herokuapp.com/parse';

function resetpwd() {
	console.log("resetpwd called");

	// unmangle form data
	var email = document.getElementById("email").value

	Parse.User.requestPasswordReset(email).then(
		function success() {
			console.log("reset password email sent")
		},
		function error(err) {
			alert("Error: " + err.code + " " + err.message)
		}
	)
}
