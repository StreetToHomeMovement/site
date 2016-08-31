Parse.initialize("sukeiran44ka88aj");
Parse.serverURL = 'https://parse-server-codecraft-x-ample.herokuapp.com/parse';

function setaccount() {
	console.log("Login called");

	// unmangle form data
	var firstname = document.getElementById("fistname").value
	var lastname = document.getElementById("fistname").value
	var password = document.getElementById("password").value

	// should use a library to parse cookies instead of doing it myself
	var raw_cookies = document.cookie.split('; ')
	var cookies = {}
	for (i = 0; i < raw_cookies.length; i++) {
		bites = raw_cookies[i].split("=")
		cookies[bites[0]] = bites[1]
	}

	var email = decodeURIComponent(cookies.email)
	var zip = cookies.zip

	var user = new Parse.User()
  user.set("username",email)
  user.set("email",email)
  user.set("password",password)

  user.set("firstname",firstname)
  user.set("lastname",lastname)
  user.set("zip",zip)

  user.signUp().then( function success(obj) {
      console.log("client signed up with id " + obj.id)
			window.location.href = '/user'
    }, function error(err) {
      console.error(err)
    })



}
