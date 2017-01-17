var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/TESTER';

/* GET home page. */
router.get('/', function(req, res, next) {
  // render the index.hbs template and replace {{title}} with 'MongoDB - Basics'
  res.render('index', {title: 'MongoDB - Basics'});
});

/* CREATE Data */
router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('data').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });

  res.redirect('/');
});

/* READ Data */


router.get('/data', function(req, res) {
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('connected to db');
    db.collection('data').find().toArray(function(err, result) {
      db.close();
      res.send(JSON.stringify(result));
    });
  });
});



router.get('/data/:id', function(req, res) {
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('data').findOne({ _id: objectId(req.params.id)}, function(err, result) {
      db.close();
      res.send(result);
    });
  });
});

/* UPDATE Data */



/* DELETE Data */

module.exports = router;
