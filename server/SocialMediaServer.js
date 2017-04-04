var express = require('express');
var passport = require('passport');
var config = require('./oauth.js');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var mongoose = require('mongoose');
var Twitter = require('twitter');
var FB = require('fb');
var moment = require('moment');


// Connect to the database
mongoose.connect('mongodb://localhost/announcementdb');
console.log("Connected to the database");
var db = mongoose.connection;
console.log(db);

// Create a user model
var User = mongoose.model('User', 
  new mongoose.Schema({
    platform: String,
    oauthID: Number,
    name: String,
    created: Date,
    tokenSecret: String,
    token: String,
    pageID: String
  })
);

// User.remove({platform: 'facebook' }, function (err) {
//   if (err) return handleError(err);
// });

// User.remove({platform: 'twitter' }, function (err) {
//   if (err) return handleError(err);
// });


// Create a UI toggle state model
var ToggleState = mongoose.model('ToggleState', 
  new mongoose.Schema({
    platform: String,
    toggleState: String
  })
);

// Set toggle state for each platform if one doesn't already exist
var setToggleState = function(platform) {
   ToggleState.findOne({ platform: platform }, function(err, toggleState) {
      if(err) {
        console.log(err);        }
      if (!err && toggleState !== null) {
        console.log("Toggle state already exists");
      } else {
        toggleState = new ToggleState({
          platform: platform,
          toggleState: 'false'
        });
        toggleState.save(function(err) {
          if(err) {
            console.log(err);  // handle errors!
          } else {
            console.log("saving toggle state ...");
          }
        });
      }
      return;
    });
}

setToggleState('facebook');
setToggleState('twitter');

// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
//app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());

// Headers
app.use(function (req, res, next) {

    // Allow these sites to make requests
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: {secure: false} }));
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ platform: 'facebook' }, function(err, user) {
      if(err) {
        console.log(err);  // handle errors!
      }
      if (!err && user !== null) {
        done(null, user);
      } else {

        // Ask for page access token
        FB.setAccessToken(accessToken);

        FB.api('me/accounts', 'get', {}, function (res) {
          var pageToken = "";
          var pageIdentifier = "";

          if(!res || res.error) {
            console.log(!res ? 'Failed to get page access token:' : res.error);
            done(res.error);
          }
          
          pageToken = res.data[0].access_token;
          pageIdentifier = res.data[0].id;

          user = new User({
            platform: 'facebook',
            oauthID: profile.id,
            name: profile.displayName,
            created: Date.now(),
            tokenSecret: pageToken,
            token: accessToken,
            pageID: pageIdentifier
          });
          user.save(function(err) {
            if(err) {
              console.log(err);  // handle errors!
            } else {
              console.log("saving user ...");
              done(null, user);
            }
          });
        });
      }

      return done(null, profile);
    });
  }
));

// Configure Twitter strategy
passport.use(new TwitterStrategy( {
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL
  }, 
 function(token, tokenSecret, profile, done) {
    console.log("Got to the twitter strategy result");
    // If a twitter user doesn't exist in our database, create one
    
    process.nextTick(function() {
      User.findOne({ platform: 'twitter' }, function(err, user) {
        if(err) {
          console.log(err);  // handle errors!
        }
        if (!err && user !== null) {
          done(null, user);
        } else {
          user = new User({
            platform: 'twitter',
            oauthID: profile.id,
            name: profile.displayName,
            created: Date.now(),
            tokenSecret: tokenSecret,
            token: token,
          });
          user.save(function(err) {
            if(err) {
              console.log(err);  // handle errors!
            } else {
              console.log("saving user ...");
              done(null, user);
            }
          });
        }
      });

    return done(null, profile);
    });
  }
));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(user, done) {
    User.findById(user.id, function (err, user) {
      done(err, user);
    });
});


/* Facebook */

var postToFacebook = function(req, res) {
  // Info sent to us from the front-end
  var post = req.body;
  var status = post.title + '\n' + post.body;
  var scheduledTime = post.date;

  console.log("Received post for Facebook:" + post);

  User.findOne({platform: 'facebook'}, function(err, user) {
    if (!err && user !== null) {
      FB.setAccessToken(user.tokenSecret);

      var fields = { message: status };
      if (scheduledTime >= moment().unix() + 620) {
        fields.published = false;
        fields.scheduled_publish_time = scheduledTime;
      }

      FB.api(user.pageID + '/feed', 'post', fields, function (res) {
        if(!res || res.error) {
          console.log(!res ? 'FB posting error:' : res.error);
          return;
        }
        console.log('FB posting success! Post Id: ' + res.id);
      });

    res.send("sucess");

    } else {
      console.log("FB posting error: database read error, or user doesn't exist.");
      res.send("error");
    }
  });
}

var getFacebookUser = function(req, res) {
  User.findOne({platform: 'facebook'}, function(err, user) {
    if (err || user == null) {
      res.send({'error':'unable to get user' + err});
    } else {
      // We don't want to send the token back over an
      // insecure connection
      user['token'] = null;
      res.send(user);
    }
  });
}

var removeFacebookUser = function(req, res) {
  User.findOne({ platform: 'facebook' }, function(err, user) {
      if (!err && user !== null) {
        user.remove();
      } else {
        res.send({'error':'An error has occurred'});
      }
    });
}

var setFacebookToggleState = function(req, res) {
  ToggleState.findOne({platform: 'facebook'}, function(err, state) {
    if (!err && state !== null) {
        console.log(req.body);
        state.toggleState = req.body.toggle;

        state.save(function(err) {
          if(err) {
            console.log(err);  // handle errors!
          } else {
            console.log("saving toggle state ...");
          }
        });
    }
  });
}

var getFacebookToggleState = function(req, res) {
  ToggleState.findOne({platform: 'facebook'}, function(err, state) {
    if (err || state == null) {
      res.send({'error': 'unable to get toggle state' + err});
    } else {
      res.send(state);
    }
  });
}

app.get('/login/facebook', passport.authenticate('facebook', {scope: ['publish_actions', 'publish_pages', 'manage_pages']}));

app.get('/login/facebook/callback', passport.authenticate('facebook', {successRedirect: 'http://127.0.0.1:8080',
  failureRedirect: 'http://127.0.0.1:8080'
}));

// Post 
app.put('/facebook/post', postToFacebook);

// Get facebook user if already exists
app.get('/facebook/user', getFacebookUser);

// Remove facebook user (i.e. unlink account)
app.get('/facebook/remove', removeFacebookUser);

// UI toggle state
app.put('/facebook/settogglestate', setFacebookToggleState);
app.get('/facebook/gettogglestate', getFacebookToggleState);



/* Twitter */

/* Database updates for twitter */

// Remove the twitter user from the db (i.e. unlink their account)
var removeTwitterUser = function(req, res) {
   User.findOne({ platform: 'twitter' }, function(err, user) {
      if (!err && user !== null) {
        user.remove();
      } else {
        res.send({'error':'An error has occurred'});
      }
    });
}

// Skeleton code for posting to twitter
var postToTwitter = function(req, res) {
  // Info sent to us from the front-end
  var post = req.body;

  console.log(req);

  console.log("Recieved post");
  console.log(req.body);

  // Get the twitter user's info from the db
  User.findOne({platform: 'twitter'}, function(err, user) {
      if (!err && user !== null) {
        // Make request to twitter api
        // some code goes here
        var client = new Twitter({
            consumer_key: config.twitter.consumerKey,
            consumer_secret: config.twitter.consumerSecret,
            access_token_key: user.token,
            access_token_secret: user.tokenSecret 
        });

        console.log(user.token);
        console.log(user.tokenSecret);

        var status = post.title + '\n ' + post.body;

        // If the post title + post body is too long,
        // just use the title
        if (status.length > 140) {
          status = post.title;
        }

        // If the title alone is too long, crop it
        if (post.title > 140) {
          status = status.slice(0, 146) + '...';
        }

        client.post('statuses/update', {status: status}, function(error, tweet, response) {
            if (error) {
              console.log("an error occurred while posting to twitter");
              console.log(error);
            } else {
              console.log("Succesfully posted to twitter");
              res.send("sucess");
            }
        });

        // on success, send a response to our front end saying so
        // some code goes here


      } else {
        // send a response to the front-end saying
        // that we weren't able to post to twitter
        console.log("An error occured while posting to twitter");
      }
  });
}

// Grab the twitter user info (except the token)
var getTwitterUser = function(req, res) {
  User.findOne({platform: 'twitter'}, function(err, user) {
    if (err || user == null) {
      res.send({'error':'unable to get user' + err});
    } else {
      // We don't want to send the token back over an
      // insecure connection
      user['token'] = null;

      res.send(user);
    }
  });
}

var setTwitterToggleState = function(req, res) {
  ToggleState.findOne({platform: 'twitter'}, function(err, state) {
    if (!err && state !== null) {
        console.log(req.body);
        state.toggleState = req.body.toggle;

        state.save(function(err) {
          if(err) {
            console.log(err);  // handle errors!
          } else {
            console.log("saving toggle state ...");
          }
        });
    }
  });
}

var getTwitterToggleState = function(req, res) {
  ToggleState.findOne({platform: 'twitter'}, function(err, state) {
    if (err || state == null) {
      res.send({'error': 'unable to get toggle state' + err});
    } else {
      res.send(state);
    }
  });
}

/* Twitter API for our server*/

// Authenticate
app.get('/login/twitter', passport.authenticate('twitter'));
app.get('/login/twitter/callback', passport.authenticate('twitter', {successRedirect: 'http://127.0.01:8080',
  failureRedirect: 'http://127.0.0.1:8080'
}));

// Post 
app.put('/twitter/post', postToTwitter);

// Get twitter user if already exists
app.get('/twitter/user', getTwitterUser);

// Remove twitter user (i.e. unlink account)
app.get('/twitter/remove', removeTwitterUser);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


// UI toggle state
app.put('/twitter/settogglestate', setTwitterToggleState);
app.get('/twitter/gettogglestate', getTwitterToggleState);

app.listen(4000);
