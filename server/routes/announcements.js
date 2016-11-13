
var mongo = require('mongodb');
var BSON = require('mongodb').BSONPure;
var ObjectId = require('mongodb').ObjectID;

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving announcement: ' + id);
    db.collection('announcements', function(err, collection) {
        console.log("Right before findone call");
        collection.findOne({'_id': new ObjectId(id)}, function(err, item) {
            console.log("In findone");
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
    db.collection('announcements', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, announcement, {safe:true}, function(err, result) {
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


var populateDB = function() {
	var announcements = [
		{
			title: "BUY ONE DOZEN GET ONE DOZEN FREE",
			content: "<b>October 13 - October 19</b> <br> 8:00 AM - 10:00 PM <br> Exclusions apply. See <a href=\"http:www.krispykreme.com\">here<a> for more details.",
			image: "http://cdn.jamieoliver.com/recipe-database/oldImages/xtra_med/1235_1_1436889055.jpg", 
			startDate: "2016-06-27T09:00:00.000Z",
			endDate: "2016-11-05T10:00:00.000Z"
		}
	];

    db.collection('announcements', function(err, collection) {
        collection.insert(announcements, {safe:true}, function(err, result) {});
    });
};