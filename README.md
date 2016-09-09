##Setup

Install latest version of [nodejs](https://nodejs.org) for your operating system 

Install [nodemon](https://github.com/remy/nodemon) to monitor for any changes in the node.js application and automatically restart the server:
```bash
$ npm install -g parse-dashboard
```

Install [Parse dashboard](https://github.com/ParsePlatform/parse-dashboard) to view and manipulate the Parse database in the browser: 
```bash
$ npm install -g parse-dashboard
```

Clone this repository locally to your machine
```bash
$ git clone git@github.com:StreetToHomeMovement/site.git
```

Install dependencies:
```bash
$ npm install
```

Replace the placeholder passwords in passwords.sample.json with the actual passwords (ask @ddeanto for the passwords). Then, change the file name from passwords.sample.json to passwords.json. 


##Run Locally

```cd``` the main dir on your machine locally and
run the following command to host locally on port 3000:
```bash
$ nodemon app.js
```

Open browser (Chrome or Firefox ideally) and go to <http://localhost:3000/> to see the site

##Launch Parse Dashboard

Launch Parse dashboard (ask @ddeanto for masterKey and serverURL): 
```bash
$ parse-dashboard --appId yourAppId --masterKey yourMasterKey --serverURL "https://example.com/parse" --appName optionalName
```

You should now be able to access parse dashboard via the browser at <http://0.0.0.0:4040/>
