// https://parseplatform.github.io/Parse-SDK-JS/api/
Parse.initialize("sukeiran44ka88aj");
Parse.serverURL = 'https://parse-server-codecraft-x-ample.herokuapp.com/parse';

function joinRevolution() {

	var email = document.getElementById("email").value
	var zip = document.getElementById("zip").value
	console.log("email: " + email + " zip: " + zip)

	var user = new Parse.User();
	// username and password are required fields by Parse
	user.set("username",email)
	user.set("password",zip)

	// email is optional field by Parse
	user.set("email",email)

	// these are custom fields I am adding
	user.set("zip",zip)
	user.set("payingMember",false)

	user.signUp().then( function success(obj) {
		  console.log("User signed up with id " + obj.id)
		}, function error(err) {
			console.error(err)
		})

}

document.getElementById("submit").addEventListener("click", joinRevolution, false)
