var express = require('express');
var router = express.Router();
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var key = require('../emailMaker.json');
var fs = require('fs');
var mongojs = require('mongojs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Email Maker', message:'Email was not created.'});
});

/* POST user new email info. */
router.post('/', function(req, res) {
  var oldEmail=req.body.oldEmail;
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var newEmail = req.body.userEmail;
  var emailPassword = req.body.userPassword;

  req.session.first=firstName;
  req.session.last=lastName;
  req.session.email=newEmail+"@student.alu.edu";

  var db = mongojs('studentEmails', ['studentEmails']);
  //MongoDB
  db.studentEmails.findOne({email:oldEmail},function(error, docs){
    if(docs!=null){
          console.log("make new email");
          //message = makeNewEmail(firstName,lastName,newEmail,emailPassword);
          var jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            ["https://www.googleapis.com/auth/admin.directory.user"],
            'eruiz@alu.edu'
          );
          jwtClient.authorize(function (err, tokens) {
                if (err) {
                  console.log(err);
                  return;
                }
                google.admin('directory_v1').users.insert({
                    auth:jwtClient,
                    resource: {
                    name: { givenName: firstName, familyName: lastName },
                    password:emailPassword,
                    primaryEmail:newEmail+"@student.alu.edu"
                    }
                },function(error, response){
                    if (error) {
                      console.log('The API returned an error: ' + error);
                      req.session.googleErrorMessage = "email already taken!";
                      res.redirect('/googleError');
                      return;
                    }
                    console.log("going to delete email on database");
                    // uncomment to delete email from db after student email has been created
                    try {
                    db.studentEmails.remove({email:oldEmail});
                    console.log("deleted email on database");
                    } catch (e) {
                       console.log(e);
                    }
                    res.redirect('/cpage');
                    return;

                });
            });

    }else{
      //couldn't find that person on the database
      req.session.notfound = "Couldn't find your email in our system.";
      res.redirect('/error');
      return;
    }
    db.close();
		});
  //
});

module.exports = router;
