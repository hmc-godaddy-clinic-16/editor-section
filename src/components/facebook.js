import React from 'react';
import passport from 'passport';
var FacebookStrategy = require('passport-facebook').Strategy;

class Facebook extends React.Component {

	constructor(props) {
	    super(props); 
  	}

	passport.use(new FacebookStrategy({
	    clientID: 1056599564445365,
	    clientSecret: e5ffee3067470ff41a1b133e0a20c8ce,
	    callbackURL: "http://0.0.0.0:8080/"
	  },
	  function(accessToken, refreshToken, profile, done) {
	    User.findOrCreate(..., function(err, user) {
	      if (err) { return done(err); }
	      done(null, user);
	    });
	  }
	));
}

export default Facebook; 