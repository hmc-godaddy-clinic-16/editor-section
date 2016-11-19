// Not using ES6 syntax currently - ask about that?

var express = require('express');
var announcement = require('./routes/announcements');
//var announcement = require('./routes/announcements');


var app = express();

var bodyParser = require('body-parser');
var morgan = require('morgan');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  next();
});


app.get('/announcements', announcement.findAll);
app.get('/announcements/:id', announcement.findById);
app.post('/announcements', announcement.addAnnouncement);
app.put('/announcements/:id', announcement.updateAnnouncement);
app.delete('/announcements/:id', announcement.deleteAnnouncement);


app.listen(3000);
console.log('Listening on port 3000...');

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


