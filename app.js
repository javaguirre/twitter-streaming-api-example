
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var auth = require('./authentication.js');
var passport = require('passport');
var User = require('./user.js')
var fs = require('fs')
var Twit = require('twit')
var config = require('./oauth.js')

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'SECRETA' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// serialize and deserialize
passport.serializeUser(function(user, done) {
  console.log('serializeUser: ' + user._id)
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    console.log(user)
    if(!err) done(null, user);
    else done(err, null)
  })
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/fight', routes.fight);
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
        passport.authenticate('twitter', { successRedirect: '/fight',
                                           failureRedirect: '/' }));
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { successRedirect: '/fight',
                                            failureRedirect: '/',
                                            scope: 'read_stream'
                                            }));

var server = http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

//Twitter
var T = new Twit({
  consumer_key: config.twitter.consumerKey,
  consumer_secret: config.twitter.consumerSecret,
  access_token: config.twitter.accessToken,
  access_token_secret: config.twitter.accessTokenSecret
})

//Socket.io
var io = require('socket.io').listen(server);
var stream = T.stream('statuses/sample')

io.sockets.on('connection', function (socket) {
  // stream.on('tweet', function(tweet) {
  //   socket.emit('info', { tweet: tweet});
  // });
});
