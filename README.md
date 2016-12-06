##OVERVIEW

Keith, our website is a **NodeJS** app that uses **expressJS** as a router, **mLab MongoDB** (as a Heroku add on) as a database, and **Parse Server** (open source “Parse”) as an “api” to our MongoDB database. Parse Server is nice because it does most of the work for us when it comes to managing users, sessions, password resets, and other typical tasks. Also, we are using **Mailgun** (as a Heroku add on) to automatically send emails to our users, **Braintree** to process donations, and **GhostPro** for blogging (news articles). We will be using **Heroku** as a host, however, we can switch to any hosting platform you want but it may complicate integration with some of the add ons.

##BRAINTREE (payments)

You will have to make your own account tied to your bank account. Just [go here](https://www.braintreepayments.com/) and click on "Sign up" and follow instructions. We should be able to get discounted rates since we are a non-profit. 

Once you create the account I will walk you through how to create the subscription plans and webhooks (the webhooks update our MongoDB when subscriptions are charged). 

After creating the account, add the required passwords from this Braintree account to passwords.json in our codebase.

Here are links to the guide and API (make sure NODE.JS is selected for our server side language and javascript/v2 for client side): 
* https://developers.braintreepayments.com/guides/overview
* https://developers.braintreepayments.com/reference/overview

##HEROKU (host)

Heroku seems like the most convenient hosting platform. It allows seamless integration with add-ons such as mailgun.

You should make your own account. I have no advice on what account level you need – but let's start with the free version while testing, then move up to “hobby” or “standard” when we officially launch. **Follow these steps to get started:**

1. Go to heroku.com, make an account, and then make a new app.

2. Under Deploy, follow the instructions under "install the Heroku CLI" and "Existing Git Repository". Ignore the next two subsections ("Create a new Git repository" and "Deploy your application"). These steps allow you to push/deploy our GitHub directory to Heroku using Heroku's command line interface. 

3. Under Resources, go to add ons and:
  1. add *mLab MongoDB* (get the Sandbox - Free version since I don't see us needing anything higher).
  2. add *Mailgun* (the Starter - Free version should be sufficient).

4. Under Settings click on "Reveal Config Vars", manually add these variables:
  1. *APP_ID* - set this to whatever you want. This is what Parse Server uses as a client key to secure the app. Clients will have access to this variable and need to provide it when interacting with our mLab database.
  2. *SERVER_URL* - set this to the parse mount path: "http://www.streettohomemovement.org/parse" (search for "// Serve the Parse API on the /parse URL prefix" in our codebase to see where this is set)
  3. *MASTER_KEY* - set this to whatever you want but make sure it is secure, hidden from the public, and hard to guess. This key allows you to override all ACL's in our database and let's you read/write on any database object. 
  4. *EMAIL_FROM* - I would recommend setting this to: "no-reply@streettohomemovement.org". This is the email address Mailgun will use as the send address when our users get password reset emails, or reminder emails to finish seting their accounts.
  5. *btMerchantId* - This is the Braintree merchantId (need to make a Braintree account) 
  6. *btPublicKey* - This is the Braintree publicKey (need to make a Braintree account)
  7. *btPrivateKey* - This is the Braintree privateKey (need to make a Braintree account)
  
6. cd locally to the website directory and enter the command ```$ git push heroku master``` into the terminal. This pushes/deploys your local code to Heroku. Heroku is smart and will detect our site is a NodeJS app. Heroku will use our "package.json" file as a starting point - Heroku will automatically install all of the dependencies listed, run the command(s) needed to start the app, etc.

7. Once everything is working, you can change the url to a custom domain (such as streettohomemovement.org) by following [these instructions](https://devcenter.heroku.com/articles/custom-domains).

Here are some reference links:
* https://devcenter.heroku.com/articles/getting-started-with-nodejs
* https://devcenter.heroku.com/articles/deploying-a-parse-server-to-heroku
* https://elements.heroku.com/addons/mailgun

NOTE: If you want to run our site locally (for testing/development) then replace the placeholder passwords in passwords.sample.json with the actual passwords. Then, change the file name from passwords.sample.json to passwords.json.

##PARSE SERVER (database api)

As you know, we are using Parse Server as an “api” to our Mongo database since it has nice features such as out of the box User/Session Token, Password Reset solutions. I believe people use the term “backend as a service” to describe Parse Server. Parse Server is available as a NodeJS module, therefore, no installation is needed (it is listed in “package.json” as a dependency).

Parse Server has a dashboard that you can use to get a good sense of what's in our database, set ACL's, and manually edit data. Following [these instructions](https://github.com/ParsePlatform/parse-dashboard) to install and run.  

Here are some additional reference links:
* http://parseplatform.github.io/docs/js/guide/
* https://parseplatform.github.io/Parse-SDK-JS/api/

##Ghost (blogging/news)

Unfortunately, according to [their documentation](http://support.ghost.org/deploying-ghost/#manual-setup) many of the Node-specific cloud hosting solutions such as Nodejitsu & Heroku are NOT compatible with Ghost. They will work at first, but they will delete your files and therefore all image uploads and your database will disappear. Heroku supports MySQL so you could use this, but you will still lose any uploaded images.
 Therefore, we will use GhostPro (ghost.org) as a host. This has some benefits – for example, they will take care of updates and security for us beheind the scenes.

Make an account [here](https://ghost.org/) and I will walk you through the rest in person.

##Run Locally

Install latest version of [nodejs](https://nodejs.org) for your operating system

Install [nodemon](https://github.com/remy/nodemon) to monitor for any changes in the node.js application and automatically restart the server during development:
```bash
$ npm install -g nodemon
```
Clone this repository locally to your machine
```bash
$ git clone git@github.com:StreetToHomeMovement/site.git
```

```cd``` into the directory you just cloned then install dependencies:
```bash
$ npm install
```

Replace the placeholder passwords in passwords.sample.json with the actual passwords (ask @ddeanto for the passwords). Then, change the file name from passwords.sample.json to passwords.json.

```cd``` to the main dir on your machine locally and
run the following command to host locally on port 3000:
```bash
$ nodemon app.js
```

Open browser (Chrome or Firefox ideally) and go to <http://localhost:3000/> to see the site
