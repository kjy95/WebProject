var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AirBNB' });
});

router.get('/signin', function(req, res, next) {
  res.render('signin');
});

router.get('/users', function(req, res, next) {
  res.render('users');
});

module.exports = router;
