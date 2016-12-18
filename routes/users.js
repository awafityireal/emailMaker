var express = require('express');
var router = express.Router();
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var fs = require('fs');

/* POST users listing. */
router.post('/', function(req, res, next) {

//came from form
  res.send(listUsers());
});

module.exports = router;
