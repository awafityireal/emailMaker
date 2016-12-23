var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Email Maker', message:'Email was not created.'});
});

module.exports = router;
