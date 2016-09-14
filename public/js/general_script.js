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

function makeTempAccount() {
	console.log("Temp login called");

	// unmangle form data
	var email = document.getElementById("email").value
	var zip = document.getElementById("email").value
	var randomPassword = Math.random().toString(36).slice(-8)

	var user = new Parse.User()
  user.set("username",email)
  user.set("email",email)
	user.set("zip",zip)
	user.set("password",randomPassword)
	user.set("userSetPassword",false)

  user.signUp().then(
		function success(obj) {
      console.log("temp account made with id " + obj.id)
			console.log(obj)
			window.location.href = '/pay'
    },
		function error(err) {
      console.error(err)
			// write code here that handles what happens if their is already a User
			// with this email address? what if they want to donate again without
			// making an account?
    }
	)
}

function setaccount() {
	console.log("setting account");

	// unmangle form data
	var firstname = document.getElementById("firstname").value
	var lastname = document.getElementById("lastname").value
	var password = document.getElementById("password").value

	Parse.User.current().setPassword(password)
	Parse.User.current().set("firstname",firstname)
	Parse.User.current().set("lastname",lastname)
	Parse.User.current().save().then( function success(obj) {
			console.log('set account for user: ' + obj.id)
			document.location.href = '/user'
		}, function error(err) {
			console.error(err)
		}
	)
}
