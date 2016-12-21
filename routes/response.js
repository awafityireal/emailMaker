var express = require('express');
var router = express.Router();
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var fs = require('fs');
var mongo = require('mongodb');

/* POST user new email info. */
router.post('/', function(req, res, next) {
  var oldEmail=req.body.oldEmail;
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var newEmail = req.body.userEmail;
  var emailPassword = req.body.userPassword; 
//came from form
  console.log(req.body);
});

module.exports = router;
