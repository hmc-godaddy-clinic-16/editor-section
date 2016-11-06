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

app.get('/announcements', announcement.findAll);
app.get('/announcements/:id', announcement.findById);
app.post('/announcements', announcement.addAnnouncement);
app.put('/announcements/:id', announcement.updateAnnouncement);
app.delete('/announcements/:id', announcement.deleteAnnouncement);


app.listen(3000);
console.log('Listening on port 3000...');

var mongo = require('mongodb');

