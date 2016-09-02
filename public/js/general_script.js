Parse.initialize("sukeiran44ka88aj")
if (window.location.href.indexOf('localhost:3000') != -1) {
	Parse.serverURL = 'http://localhost:3000/parse'
} else {
	Parse.serverURL = 'https://parse-server-codecraft-x-ample.herokuapp.com/parse'
}
console.log('Parse.serverURL: ' + Parse.serverURL)


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

function userPageOrLogin() {
  // see if sessionToken is valid
  Parse.User.become(Parse.User.current().getSessionToken()).then(function success() {
    window.location.href = '/user'
  }, function error() {
    alert('Please login')
    window.location.href = '/login'
  })
}

function resetpwd() {
	console.log("resetpwd called");

	// unmangle form data
	var email = document.getElementById("email").value

	Parse.User.requestPasswordReset(email).then(
		function success() {
			alert("reset password email sent")
		},
		function error(err) {
			alert("Error: " + err.code + " " + err.message)
		}
	)
}
