function login() {
	console.log("Login called");

	// unmangle form data
	var email = document.getElementById("email").value
	var password = document.getElementById("password").value

	Parse.User.logIn(email, password).then(
		function success(user) {
			console.log("Logged in ", Parse.User.current())
			document.cookie = "email="+Parse.User.current().attributes.email+";"
			document.cookie = "sessionToken="+Parse.User.current().getSessionToken()+";"
			window.location.href = '/news'
		},
		function error(err) {
			document.getElementById("spinner").style.visibility = "hidden"
			alert("Error: " + err.code + " " + err.message)
		}
	)
}

function tempLogin(email,password) {
	Parse.User.logIn(email, password).then(
		function success(user) {
			console.log("Logged in ", Parse.User.current())
		},
		function error(err) {
			document.getElementById("spinner").style.visibility = "hidden"
			alert("Error: " + err.code + " " + err.message)
		}
	)
}

function logout() {
	console.log("Logout called");

	Parse.User.logOut().then(
		function success(user) {
			document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
			document.cookie = "sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
			console.log("Logged Out ", Parse.User.current())
			window.location.href = "/"
		},
		function error(err) {
			alert("Error: " + err.code + " " + err.message)
		}
	)
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
			document.getElementById("spinner").style.visibility = "hidden"
			alert("Error: " + err.code + " " + err.message)
		}
	)
}

function makeTempAccount() {
	console.log("Temp login called")

	// unmangle form data
	var email = document.getElementById("email").value
	var zip = document.getElementById("zip").value
	var randomPassword = Math.random().toString(36).slice(-8)

	var user = new Parse.User()
  user.set("username",email)
  user.set("email",email)
	user.set("zip",zip)
	user.set("password",randomPassword)
	user.set("tempAccount",true)
	user.set('tempPassword',randomPassword)
	user.set('reminderEmail',false)
  user.signUp().then(
		function success(tempUser) {
      console.log("temp account made with id " + tempUser.id)
			document.cookie = "email="+Parse.User.current().attributes.email+";"
			document.cookie = "sessionToken="+Parse.User.current().getSessionToken()+";"
			window.location.href = '/donationAmount'
    },
		function error(err) {
			document.getElementById("spinner").style.visibility = "hidden"
      console.log(err)
			// write code here that handles what happens if their is already a User
			// with this email address? what if they want to donate again without
			// making an account?
    }
	)
}

function setaccount() {
	console.log("setting account")

	// unmangle form data
	var firstname = document.getElementById("firstname").value
	var lastname = document.getElementById("lastname").value
	var password = document.getElementById("password").value

	Parse.User.current().setPassword(password)
	Parse.User.current().set("firstname",firstname)
	Parse.User.current().set("lastname",lastname)
	Parse.User.current().set("tempAccount",false)
	Parse.User.current().set("tempPassword",null)
	Parse.User.current().set("donorDisplayName",firstname)

	Parse.User.current().save().then( function success(obj) {
			console.log('set account for user: ' + obj.id)

			document.location.href = '/donors'
		}, function error(err) {
			document.getElementById("spinner").style.visibility = "hidden"
			consoe.log(err)
		}
	)
}

function changeDonorDisplayName() {
	var newName = document.getElementById('newName').value
	console.log("changing donorDisplayName")

	Parse.User.current().set("donorDisplayName",newName)

	Parse.User.current().save().then( function success(obj) {
			console.log('changed donorDisplayName for: ' + obj.id)

			document.location.href = '/donors'
		}, function error(err) {
			console.error(err)
		}
	)

}

function callDeleteAllPaymentMethods() {
	Parse.Cloud.run("deleteAllPaymentMethods").then(function(resultMsg) {
		console.log(resultMsg)
		window.location.href = '/user'
	})
}

function callCancelExistingSubscription() {
	var existingSubscriptionId = Parse.User.current().attributes.braintreeSubscriptionId
	Parse.Cloud.run('cancelExistingSubscription', {subscriptionId: existingSubscriptionId}).then(function(result) {
		console.log(result)
		alert('subscription canceled')
		window.location.href = '/user'
	})
}
