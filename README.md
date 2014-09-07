# Installation

We need Node, npm, bower and MongoDB for this to work. Then in the project directory:

    $ npm install
    $ bower install

Mongodb must be installed and started, otherwise you will get a connection error

# Twitter stream

If you go to http://localhost:3000/fight you will get the Twitter stream

# Oauth.js for Facebook and Twitter

```javascript
var ids = {
    facebook: {
        clientID: "",
        clientSecret: "",
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    twitter: {
        consumerKey: "",
        consumerSecret: "",
        callbackURL: "http://localhost:3000/auth/twitter/callback",
        accessToken: "",
        accessTokenSecret: ""
    }
}

module.exports = ids
```
