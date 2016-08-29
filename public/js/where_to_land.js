Parse.initialize("sukeiran44ka88aj");
Parse.serverURL = 'https://parse-server-codecraft-x-ample.herokuapp.com/parse';

function myDoggie() {
  // see if sessionToken is valid
  Parse.User.become(Parse.User.current().getSessionToken()).then(function success() {
    window.location.href = '/user'
  }, function error() {
    alert('Please login')
    window.location.href = '/login'
  })

}
