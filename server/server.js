/* This file provides an API for storing user-entered data
 * in a MongoDB instance */

// Not using ES6 syntax currently
// Run this file by running node server.js 
// Requires that mongodb be properly installed and running locally to work

var express = require('express');
var announcement = require('./routes/announcements');

var app = express();

var bodyParser = require('body-parser');
var morgan = require('morgan');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  if (req.url != '/favicon.ico') { 
    next();
  }
});

// The API 
// Currently provides more functionallity than the client side code
// makes use of
app.get('/announcements', announcement.findAll);
app.get('/announcements/:id', announcement.findById);
app.post('/announcements', announcement.addAnnouncement);
app.put('/announcements/:id', announcement.updateAnnouncement);
app.delete('/announcements/:id', announcement.deleteAnnouncement);


app.listen(3000);
console.log('Listening on port 3000...');


// Handle the connection to the database
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('announcementdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'announcementdb' database");
        db.collection('announcements', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'announcements' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

// If the given database doesn't have anything in the announcements collection,
//  populate with some basic information
var populateDB = function() {
  var announcements = [
    {
      title: "BUY ONE DOZEN GET ONE DOZEN FREE",
      content: "<b>October 13 - October 19</b> <br> 8:00 AM - 10:00 PM <br> Exclusions apply. See <a href=\"http:www.krispykreme.com\">here<a> for more details.",
      imgUrl: "http://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1235_1_1436889055.jpg", 
      startDate: "2016-06-27T09:00:00.000Z",
      endDate: "2016-11-05T10:00:00.000Z",
      link: "http://www.thedonutmanca.com/"
    }
  ];

    db.collection('announcements', function(err, collection) {
        collection.insert(announcements, {safe:true}, function(err, result) {});
    });
};

