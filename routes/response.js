var express = require('express');
var router = express.Router();

router.get('/cpage',function(req, res, next) {
  res.render('confirmation', {title: 'Account Created'});
});
module.exports = router;
