var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AirBNB' });
});
//로그인
router.get('/signin', function(req, res, next) {
  res.render('signin');
});

// router.get('/users', function(req, res, next) {
//   res.render('users');
// });

// 회원가입
router.get('/users/new', function(req, res, next) {
  res.render('users/new');
});

// router.get('/', function(req, res, next) {
//   res.render('/');
// });

module.exports = router;
