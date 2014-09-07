// You need to add your Facebook and Twitter keys here
// https://dev.twitter.com/
// https://developers.facebook.com/
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
