
var mongo = require('mongodb');
var BSON = require('mongodb').BSONPure;
var ObjectId = require('mongodb').ObjectID;

// This file defines what the API does/ what the routes do (see server.js). findById
// and updateAnnouncement have been tested and are in use. Other methods may become more
// helpful if multiple announcements are supported

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving announcement: ' + id);
    db.collection('announcements', function(err, collection) {
        collection.findOne({'_id': new ObjectId(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('announcements', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addAnnouncement = function(req, res) {
    var announcement = req.body;
    console.log('Adding announcement: ' + JSON.stringify(announcement));
    db.collection('announcements', function(err, collection) {
        collection.insert(announcement, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateAnnouncement = function(req, res) {
    var id = req.params.id;
    var announcement = req.body;
    console.log('Updating announcement: ' + id);
    console.log(JSON.stringify(announcement));
    console.log(req.headers);
    delete announcement._id;

    db.collection('announcements', function(err, collection) {
        collection.update({'_id':new ObjectId(id)}, announcement, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating announcement: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(announcement);
            }
        });
    });
}

exports.deleteAnnouncement = function(req, res) {
    var id = req.params.id;
    console.log('Deleting announcement: ' + id);
    db.collection('announcements', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}