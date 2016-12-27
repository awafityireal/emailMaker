var express = require('express');
var router = express.Router();
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var key = require('../emailMaker.json');
var fs = require('fs');
var mongojs = require('mongojs');
//used for gmail base64 encoding of message
var base64 = require('base-64');
//
function updateCreatedEmails(first, last, oldemail, newemail){
  var db = mongojs('createdEmails', ['createdEmails']);
  db.createdEmails.insert({firstName: first, lastName: last, oldEmail: oldemail, newEmail: newemail},function(error,res){
    if(error){
      console.log(error);
    }
    db.close();
  });
}

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
          console.log(docs);
          console.log(docs.email);
          console.log("make new email");
          var jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            ["https://www.googleapis.com/auth/admin.directory.user", "https://mail.google.com/", "https://www.googleapis.com/auth/gmail.modify", "https://www.googleapis.com/auth/gmail.compose", "https://www.googleapis.com/auth/gmail.send"],
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
                      console.log(docs.email);
                      return;
                    }
                    console.log("going to delete email on database");
                    console.log(docs.email);
                    //delete email from db after student email has been created
                    try {
                      var db = mongojs('studentEmails', ['studentEmails']);
                    db.studentEmails.remove({email: docs.email},function(err){
                      if(!err)console.log("deleted email on database");
                      else console.log(err);
                    });
                    } catch (e) {
                       console.log(e);
                    }//end delete email from db

                    updateCreatedEmails(firstName, lastName, oldEmail, req.session.email);
                    res.redirect('/cpage');
                            //let's send them an email to notify them
                            google.gmail('v1').users.messages.send({
                            'auth':jwtClient,
                            'userId': docs.email,
                            resource:{
                                    'raw': base64.encode("To:"+docs.email+"\nFrom:tech@alu.edu\nSubject: Your new ALU student email\n\n Hello " + req.session.first + " " + req.session.last + ",\n\nYour new ALU student email:\t" + req.session.email +"\nwith the password:\t" + emailPassword + "\n has been created.\n\nYou can use this link to access your email: https://www.google.com/accounts/AccountChooser?Email="+req.session.email+"&continue=https://apps.google.com/user/hub")
                            }
                          },function(error,response){
                            if (error) {
                              console.log(error);
                            }
                          });//end of sending email
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
