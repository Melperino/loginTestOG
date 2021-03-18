var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var mongoClient = require("mongodb").MongoClient;
var url  = "mongodb://localhost:27017/loginTestDB";

const bcrypt = require ('bcrypt');


/* GET index. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LoginTest' });
});

/* GET new-user*/
router.get('/new-user', function(req, res, next) {
  res.render('new-user', {title: 'Sign in'});
});

/* GET edit-user */
router.get('/edit-user', function(req, res, next) {
  res.render('edit-user', {title:'Change password'});
});
/* GET sip */
router.get('/sip', function(req, res, next) {
  res.render('sip', {title:'Make and recieve calls'});
});

/* POST Login */
router.post('/login', function(req, res, next) {
  let query = {username: req.body.username};
		mongoClient.connect(url, function(err,db){
        if (err) throw err;
        db.collection("users").find(query).toArray(function(err,result){
			bcrypt.compare(req.body.password, result[0].password, function(err, resultCrypt) {
				res.json(resultCrypt);
			});
        });
    });
});

/* POST Validate */
router.post('/validate', function(req, res, next) {
  let query = {username: req.body.username};
      mongoClient.connect(url, function(err,db){
        if (err) throw err;
        db.collection("users").find(query).toArray(function(err,result){
            res.json(result[0]);
        });
      });
  
});

/* POST EditUser*/
router.post('/editUser', function(req, res, next) {
	bcrypt.hash(req.body.password, 5, function(err, hash) {
		let query = {username: req.body.username, password: hash,}
		mongoClient.connect(url, function(err, db) {
		if (err) throw err;  
		db.collection('users').update({username: req.body.username}, {$set: query}, function(err, result) {
			if (err) throw err;
			res.send("OK");
			db.close();
			});
		});
	});
});

/*POST NewUser*/ 
router.post('/newUser', function(req, res, next){
	bcrypt.hash(req.body.password, 5, function(err, hash) {
		let query = {username: req.body.username, password:hash}
		mongoClient.connect(url, function(err, db) {
		  if (err) throw err;  
		  db.collection('users').insert(query, function(err, result) {
			if (err) throw err;
			res.send("OK");
			db.close();
		  });
		});
	});
});

module.exports = router;

