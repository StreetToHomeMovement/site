Parse.initialize("sukeiran44ka88aj");
Parse.serverURL = 'http://localhost:3000/parse';

function myDoggie() {
  // see if sessionToken is valid
  Parse.User.become(Parse.User.current().getSessionToken()).then(function success() {
    window.location.href = '/user'
  }, function error() {
    alert('Please login')
    window.location.href = '/login'
  })

}
