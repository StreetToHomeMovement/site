See http://104.131.79.42 for working example (my Braintree Sandbox can be finicky)

##TODO
Before we continue you need to make the following accounts:

 - DigitalOcean (See below for more details)
 - Braintree (See below)
 - [mLab (mongoDB)](https://mlab.com/)
 - [MailGun](https://www.mailgun.com/)
 
##OVERVIEW

Keith, our website is a **NodeJS** app that uses **expressJS** as a router, **mLab MongoDB** as a database, and **Parse Server** (open source “Parse”) as an “api” to our MongoDB database. Parse Server is nice because it does most of the work for us when it comes to managing users, sessions, password resets, and other typical tasks. Also, we are using **Mailgun** to automatically send emails to our users, **Braintree** to process donations, and **GhostPro** for blogging (news articles). We will be using **Digital Ocean** as a host.

##BRAINTREE (payments)

You will have to make your own account tied to your bank account. Just [go here](https://www.braintreepayments.com/) and click on "Sign up" and follow instructions. We should be able to get discounted rates since we are a non-profit. 

Once you create the account I will walk you through how to create the subscription plans and webhooks (the webhooks update our MongoDB when subscriptions are charged). 

Here are links to the guide and API (make sure NODE.JS is selected for our server side language and javascript/v2 for client side): 
* https://developers.braintreepayments.com/guides/overview
* https://developers.braintreepayments.com/reference/overview

##DigitalOcean (host)
First, [create your account](https://cloud.digitalocean.com/registrations/new), then create a new droplet with nodeJS and Ubuntu 16 preinstalled on it. For now, I would go with the one that costs $5/month since you can always upgrade. Then follow [these instructions](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04) to ssh into the server and create a user account. Then ssh into the server with your newly created user account, install GitHub on the server, and git clone our [site repository](https://github.com/StreetToHomeMovement/site.git) to the server. Then follow [these instructions](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04) to launch the site.

##PARSE SERVER (database api)

As you know, we are using Parse Server as an “api” to our Mongo database since it has nice features such as out of the box User/Session Token, Password Reset solutions. I believe people use the term “backend as a service” to describe Parse Server. Parse Server is available as a NodeJS module, therefore, no installation is needed (it is listed in “package.json” as a dependency).

Parse Server has a dashboard that you can use to get a good sense of what's in our database, set ACL's, and manually edit data. Following [these instructions](https://github.com/ParsePlatform/parse-dashboard) to install and run.  

Here are some additional reference links:
* http://parseplatform.github.io/docs/js/guide/
* https://parseplatform.github.io/Parse-SDK-JS/api/

##Ghost (blogging/news)

We will be self hosting Ghost on our Digital Ocean server. Here are some [docs](http://docs.ghost.org/). To create new content, or change settings/themes, go to */news/ghost ( i.e. http://www.streettohomemovement.org/news/ghost ).

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
