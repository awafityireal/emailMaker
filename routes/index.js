var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Email Maker', message:'ALU Email Maker' });
});

module.exports = router;
