var express = require('express');
var router = express.Router();

router.get('/error', function(req, res, next) {
  res.render('error', { title:'Unsuccessful', message:'was not able to create your email account'});
});

router.get('/googleError', function(req, res, next) {
  res.render('error', { title:'Unsuccessful', message:'Someone has beat you in creating that ALU student email please try another one.'});
});
module.exports = router;
